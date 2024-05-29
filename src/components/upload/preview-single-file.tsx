import Box from "@mui/material/Box";

import Image from "../image";
import { CardMedia } from "@mui/material";

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
      <Image
        alt="file preview"
        src={imgUrl}
        sx={{
          width: 1,
          height: 1,
          borderRadius: 1,
        }}
      />
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
        title="Video title"
        controls // Add this if you want to show video controls
      />
    </Box>
  );
}
