import Box from "@mui/material/Box";

import { CardMedia } from "@mui/material";
import Image from "next/image";

// ----------------------------------------------------------------------

type Props = {
  imgUrl?: string;
};

export default function SingleFilePreview({ imgUrl = "" }: Props) {
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: "absolute",
      }}
    >
      <Image alt="file preview" src={imgUrl} fill />
    </Box>
  );
}

export function SingleFileVideoPreview({
  videoUrl = "",
}: {
  videoUrl?: string;
}) {
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: "absolute",
      }}
    >
      <CardMedia
        component="video"
        src={videoUrl}
        sx={{ height: "312px", borderRadius: "8px" }}
        title="Video preview"
        controls // Add this if you want to show video controls
      />
    </Box>
  );
}
