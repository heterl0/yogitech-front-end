import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useResponsive } from "@/hooks/use-responsive";

import Logo from "@/components/logo";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  image?: string;
  children: React.ReactNode;
};

export default function AuthModernLayout({ children, image }: Props) {
  const mdUp = useResponsive("up", "md");

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: "auto",
        maxWidth: 480,
        px: { xs: 2, md: 8 },
      }}
    >
      <Logo
        sx={{
          mt: { xs: 2, md: 8 },
          mb: { xs: 10, md: 8 },
        }}
      />

      <Card
        sx={{
          py: { xs: 5, md: 0 },
          px: { xs: 3, md: 0 },
          boxShadow: { md: "none" },
          overflow: { md: "unset" },
          bgcolor: { md: "background.default" },
        }}
      >
        {children}
      </Card>
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage: `url(${image || "/assets/background/overlay_3.jpg"})`,
          top: 16,
          left: 16,
          objectFit: "cover",
          position: "relative",
          width: "calc(100% - 32px)",
          height: "calc(100% - 32px)",
          padding: { xs: 0, md: 10 },
          borderRadius: { xs: 0, md: "1rem" },
          backgroundRepeat: "no-repeat",
        }}
      >
        <Test />
      </Box>
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: "100vh",
        position: "relative",
        "&:before": {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: "absolute",
          backgroundSize: "cover",
          opacity: { xs: 0.24, md: 0 },
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: "url(/assets/background/overlay_4.jpg)",
        },
      }}
    >
      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}

function Test() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enableWebcamButtonRef = useRef<HTMLButtonElement | null>(null);

  const [webcamRunning, setWebcamRunning] = useState(true);
  const [poseLandmarker, setPoseLankmarker] = useState<PoseLandmarker | null>(
    null
  );
  useEffect(() => {
    if (canvasRef.current) {
      setCanvasCtx(canvasRef.current.getContext("2d"));
    }
  }, []);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(
    canvasRef.current?.getContext("2d") || null
  );

  useEffect(() => {
    const loadPoseLandmarker = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const model = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker_heavy.task",
          // modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1, // Initialize for video input
      });
      setPoseLankmarker(model);
    };

    loadPoseLandmarker();
  }, []);

  const enableCam = useCallback(() => {
    if (!poseLandmarker) {
      console.log("Wait! poseLandmaker not loaded yet.");
      return;
    }

    if (!webcamRunning) {
      enableWebcamButtonRef.current!.innerText = "ENABLE PREDICTIONS";
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach(function (track) {
          track.stop();
        });

        videoRef.current.srcObject = null;
      }
    } else {
      enableWebcamButtonRef.current!.innerText = "DISABLE PREDICTIONS";

      // getUsermedia parameters.
      const constraints = {
        video: true,
      };
      // Activate the webcam stream.
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoRef.current!.srcObject = stream;
        videoRef.current!.addEventListener("loadeddata", predictWebcam);
      });

      let lastVideoTime = -1;
      const predictWebcam = async () => {
        console.log(webcamRunning);
        const video = videoRef.current!;
        const canvasElement = canvasRef.current!;
        const videoHeight = "360px";
        const videoWidth = "480px"; // replace with actual value

        canvasElement.style.height = videoHeight;
        video.style.height = videoHeight;
        canvasElement.style.width = videoWidth;
        video.style.width = videoWidth;

        const startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          poseLandmarker.detectForVideo(video, startTimeMs, (result) => {
            if (canvasCtx) {
              const drawingUtils = new DrawingUtils(canvasCtx);
              canvasCtx!.save();
              canvasCtx!.clearRect(
                0,
                0,
                canvasElement.width,
                canvasElement.height
              );
              for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                  radius: (data) =>
                    DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
                });

                drawingUtils.drawConnectors(
                  landmark,
                  PoseLandmarker.POSE_CONNECTIONS
                );
              }
              canvasCtx!.restore();
            }
          });
        }
        if (webcamRunning) window.requestAnimationFrame(predictWebcam);
      };
      // // Call this function again to keep predicting when the browser is ready.
    }
  }, [poseLandmarker, webcamRunning, canvasCtx]);

  return (
    <div>
      <video
        className="absolute z-10 h-[360px] w-[480px] object-cover"
        ref={videoRef}
        id="webcam"
        autoPlay
        playsInline
      />
      <canvas
        ref={canvasRef}
        id="output_canvas"
        className="absolute z-[11] h-[360px] w-[480px] object-cover"
      />
      <button
        ref={enableWebcamButtonRef}
        id="webcamButton"
        onClick={enableCam}
        className="absolute top-1"
      >
        ENABLE PREDICTIONS
      </button>
    </div>
  );
}
