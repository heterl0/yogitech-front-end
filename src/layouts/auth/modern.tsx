import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

import { useResponsive } from "@/hooks/use-responsive";

import Logo from "@/components/logo";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
} from "@mediapipe/tasks-vision";
import { Box, Button, CardContent, Typography } from "@mui/material";
import { mockPose } from "@/_mock/_pose";
import Image from "@/components/image";
import axiosInstance, { endpoints } from "@/utils/axios";
import { fShortenNumber } from "@/utils/format-number";
import { usePathname, useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export default function AuthModernLayout() {
  const mdUp = useResponsive("up", "md");
  const [feedback, setFeedback] = useState<IFeedback>();

  const handleSetFeedback = useCallback((data: IFeedback) => {
    setFeedback(data);
  }, []);

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: "auto",
        maxWidth: 480,
        px: { xs: 2, md: 8 },
      }}
    >
      <div className="flex items-center gap-2 ">
        <Logo
          sx={{
            mt: { xs: 2, md: 8 },
            mb: { xs: 10, md: 8 },
          }}
        />
        <Typography variant="h4">Live Demo</Typography>
      </div>

      {feedback && (
        <Card
          sx={{
            py: { xs: 5, md: 0 },
            px: { xs: 3, md: 0 },
            boxShadow: { md: "none" },
            overflow: { md: "unset" },
            // bgcolor: { md: "background.default" },
            backgroundImage: `url("/assets/background/overlay_4.jpg")`,
            objectFit: "cover",
            position: "relative",
            width: "calc(100% - 32px)",
            height: "500px",
          }}
        >
          {feedback && (
            <Typography variant="h6">
              Score: {feedback ? fShortenNumber(feedback.score) : ""}
            </Typography>
          )}
          <CardContent>
            {feedback
              ? feedback.feedback.map((item, index) => {
                  if (item.endsWith("Good alignment!")) return <></>;
                  const content = item.split(". ");
                  return <div key={index}>{content[content.length - 1]}</div>;
                })
              : ""}
          </CardContent>
        </Card>
      )}
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage: `url("/assets/background/overlay_3.jpg")`,
          top: 16,
          left: 16,
          objectFit: "cover",
          position: "relative",
          width: "calc(100% - 32px)",
          height: "calc(100% - 32px)",
          padding: { xs: 0, md: 8 },
          borderRadius: { xs: 0, md: "1rem" },
          backgroundRepeat: "no-repeat",
          gap: 2,
        }}
        className="flex w-full flex-col items-center justify-center gap-2"
      >
        <Test setFeedback={handleSetFeedback} />
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

type IFeedback = {
  feedback: string[];
  score: number;
};

type SamplePose = {
  pose_id: number;
  pose_name: string;
  pose_keypoints: { x: number; y: number; z: number; visibility: number }[];
  pose_image: string;
};

type Props = {
  setFeedback: (data: IFeedback) => void;
};

function Test({ setFeedback }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const enableWebcamButtonRef = useRef<HTMLButtonElement | null>(null);
  const [webcamRunning, setWebcamRunning] = useState(true);
  const [poseLandmarker, setPoseLankmarker] = useState<PoseLandmarker | null>(
    null
  );

  const [poseSelected, setPoseSelected] = useState<SamplePose>(mockPose[0]);
  const router = useRouter();
  const pathName = usePathname();

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
    let checkTime = Date.now();
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
      setWebcamRunning(false);
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
        const [videoWidth, videoHeight] = [video.videoWidth, video.videoHeight];

        canvasElement.style.height = videoHeight + "";
        video.style.height = videoHeight + "";
        canvasElement.style.width = videoWidth + "";
        video.style.width = videoWidth + "";

        const startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          poseLandmarker.detectForVideo(video, startTimeMs, async (result) => {
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
                    DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 1, 0.2),
                });

                drawingUtils.drawConnectors(
                  landmark,
                  PoseLandmarker.POSE_CONNECTIONS
                );
              }
              canvasCtx!.restore();
            }

            if (Date.now() - checkTime >= 5000) {
              const response = await axiosInstance.post(
                endpoints.exercise.feedback,
                {
                  correct_keypoint: poseSelected.pose_keypoints,
                  user_keypoint: result.landmarks[0],
                }
              );
              const data = response.data as IFeedback;
              setFeedback(data);
              checkTime = Date.now(); // reset the start time
            }
          });
        }
        if (webcamRunning) window.requestAnimationFrame(predictWebcam);
      };
      // // Call this function again to keep predicting when the browser is ready.
    }
  }, [
    poseLandmarker,
    webcamRunning,
    canvasCtx,
    poseSelected.pose_keypoints,
    setFeedback,
  ]);

  return (
    <>
      <div className="relative flex flex-col items-center gap-2">
        <Typography variant="h4">Pose Detection</Typography>
        <Card
          className="relative h-[240px] w-[320px] rounded-md"
          color="primary"
        >
          <video
            className="relative z-10 h-[240px] w-[320px] scale-x-[-1] transform rounded-md"
            ref={videoRef}
            id="webcam"
            autoPlay
            playsInline
          />
          <canvas
            ref={canvasRef}
            id="output_canvas"
            className="absolute top-0 z-10 h-[240px] w-[320px] scale-x-[-1] transform rounded-md"
          />
        </Card>
        <Button
          ref={enableWebcamButtonRef}
          id="webcamButton"
          onClick={webcamRunning ? enableCam : () => router.push(pathName)}
          className=""
          variant="contained"
          color="primary"
          hidden={webcamRunning}
        >
          Start Detect
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography variant="h4">Pose Selected</Typography>

        <div className="relative flex w-1/2 flex-row items-center gap-2">
          {mockPose.map((item, index) => (
            <Card
              onClick={() => setPoseSelected(item)}
              className={`${item.pose_id === poseSelected.pose_id ? "border" : " "} relative w-1/3 transform-gpu rounded-md transition-transform duration-300 ease-in-out hover:scale-105`}
              color="primary"
              key={index}
            >
              <Image src={item.pose_image} alt={item.pose_name} />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
