// import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import Image from "@/components/image";
// import { shortDateLabel } from "@/components/custom-date-range-picker";
import { LEVELS } from "@/constants/level";
import { IPoseWithTime } from "@/types/exercise";
import Iconify from "@/components/iconify";
import { IconButton } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  poseWithTime: IPoseWithTime;
  onRemove: VoidFunction;
  onSelect: VoidFunction;
  isSelected: boolean;
};

export default function ExercisePoseItem({
  poseWithTime,
  onRemove,
  onSelect,
  isSelected,
}: Props) {
  const { id, name, image_url, level } = poseWithTime?.pose;

  // const renderRating = (
  //   <Stack
  //     direction="row"
  //     alignItems="center"
  //     sx={{
  //       top: 8,
  //       right: 8,
  //       zIndex: 9,
  //       borderRadius: 1,
  //       position: "absolute",
  //       p: "2px 6px 2px 4px",
  //       typography: "subtitle2",
  //       bgcolor: "warning.lighter",
  //     }}
  //   >
  //     <Iconify icon="eva:star-fill" sx={{ color: "warning.main", mr: 0.25 }} />{" "}
  //     {ratingNumber}
  //   </Stack>
  // );

  const renderPrice = (
    <IconButton
      onClick={onRemove}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        borderRadius: 4,
        bgcolor: "error.main",
        position: "absolute",
        p: "2px",
        color: "common.white",
        typography: "subtitle2",
        ":hover": {
          bgcolor: "error.dark",
        },
      }}
    >
      <Iconify icon="ic:baseline-close" />
    </IconButton>
  );

  const renderImages = (
    <Stack
      spacing={0.5}
      direction="row"
      sx={{
        p: (theme) => theme.spacing(1, 1, 0, 1),
      }}
    >
      <Stack flexGrow={1} sx={{ position: "relative" }}>
        {/* {renderRating} */}
        <Image
          alt={image_url}
          src={image_url}
          sx={{ borderRadius: 1, height: 164, width: 1 }}
        />
      </Stack>
      {/* <Stack spacing={0.5}>
        <Image
          alt={images[1]}
          src={images[1]}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80 }}
        />
        <Image
          alt={images[2]}
          src={images[2]}
          ratio="1/1"
          sx={{ borderRadius: 1, width: 80 }}
        />
      </Stack> */}
    </Stack>
  );

  const renderTexts = (
    <ListItemText
      sx={{
        p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
      }}
      primary={`${LEVELS[level - 1].label}`}
      secondary={
        <Link
          component={RouterLink}
          href={paths.dashboard.pose.edit(id + "")}
          color="inherit"
        >
          {name}
        </Link>
      }
      primaryTypographyProps={{
        typography: "caption",
        color: "text.disabled",
      }}
      secondaryTypographyProps={{
        mt: 1,
        noWrap: true,
        component: "span",
        color: "text.primary",
        typography: "subtitle1",
      }}
    />
  );

  //   const renderInfo = (
  //     <Stack
  //       spacing={1.5}
  //       sx={{
  //         position: "relative",
  //         p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
  //       }}
  //     >
  //       <IconButton
  //         onClick={popover.onOpen}
  //         sx={{ position: "absolute", bottom: 20, right: 8 }}
  //       >
  //         <Iconify icon="eva:more-vertical-fill" />
  //       </IconButton>

  //       <IconButton
  //         onClick={() => onEdit()}
  //         sx={{ position: "absolute", bottom: 20, right: 8 }}
  //       >
  //         <Tooltip title="Edit">
  //           <Iconify icon="solar:pen-bold" />
  //         </Tooltip>
  //       </IconButton>

  //       {[
  //         // {
  //         //   label: duration,
  //         //   icon: (
  //         //     <Iconify
  //         //       icon="mingcute:location-fill"
  //         //       sx={{ color: "error.main" }}
  //         //     />
  //         //   ),
  //         // },
  //         {
  //           label: `Level: ${LEVELS[level - 1].label}`,
  //           icon: (
  //             <Iconify
  //               icon="mingcute:filter-2-fill"
  //               sx={{ color: "info.main" }}
  //             />
  //           ),
  //         },
  //         // {
  //         //   label: `${bookers.length} Booked`,
  //         //   icon: (
  //         //     <Iconify
  //         //       icon="solar:users-group-rounded-bold"
  //         //       sx={{ color: "primary.main" }}
  //         //     />
  //         //   ),
  //         // },
  //       ].map((item) => (
  //         <Stack
  //           key={item.label}
  //           spacing={1}
  //           direction="row"
  //           alignItems="center"
  //           sx={{ typography: "body2" }}
  //         >
  //           {item.icon}
  //           {item.label}
  //         </Stack>
  //       ))}
  //     </Stack>
  //   );

  return (
    <>
      <div className="relative">
        {renderPrice}

        <Card
          onClick={onSelect}
          raised={isSelected}
          className={`${isSelected ? "border-grey-300 -translate-y-1 border shadow-lg" : ""} box-content cursor-pointer transition-transform! duration-200! ease-in-out!`}
        >
          {renderImages}

          {renderTexts}

          {/* {renderInfo} */}
        </Card>
      </div>
    </>
  );
}
