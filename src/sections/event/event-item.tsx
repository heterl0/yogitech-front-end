// import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import Iconify from "@/components/iconify";
// import { shortDateLabel } from "@/components/custom-date-range-picker";
import { Tooltip } from "@mui/material";
import { IEvent, getStatusLabel } from "@/types/event";
import { fDate } from "@/utils/format-time";
import { useLocales } from "@/locales";
import Image from "next/image";

// ----------------------------------------------------------------------

type Props = {
  event: IEvent;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

export default function EventItem({ event, onEdit }: Props) {
  const { id, title, image_url, active_status, start_date, expire_date } =
    event;
  const { t } = useTranslation();
  const { currentLang } = useLocales();
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

  const renderStatus = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        zIndex: 9,
        borderRadius: 1,
        bgcolor: "primary.main",
        position: "absolute",
        p: "2px 6px 2px 4px",
        color: "common.white",
        typography: "subtitle2",
      }}
    >
      {t(getStatusLabel(active_status, start_date, expire_date))}
    </Stack>
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
        {renderStatus}
        {/* {renderRating} */}
        <Image
          alt={image_url}
          src={image_url}
          height={164}
          width={320}
          className="aspect-video w-full rounded-sm bg-cover"
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
      primary={
        <>
          {t("eventPage.eventItem.from")}{" "}
          {fDate(start_date, currentLang.adapterLocale)}{" "}
          {t("eventPage.eventItem.to")}{" "}
          {fDate(expire_date, currentLang.adapterLocale)}
        </>
      }
      secondary={
        <Link
          component={RouterLink}
          href={paths.dashboard.event.details(id + "")}
          color="inherit"
        >
          {title}
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

  const renderInfo = (
    <Stack
      spacing={1.5}
      sx={{
        position: "relative",
        p: (theme) => theme.spacing(0, 2.5, 2.5, 2.5),
      }}
    >
      {/* <IconButton
        onClick={popover.onOpen}
        sx={{ position: "absolute", bottom: 20, right: 8 }}
      >
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton> */}

      <IconButton
        onClick={() => onEdit()}
        sx={{ position: "absolute", bottom: 20, right: 8 }}
      >
        <Tooltip title={t("eventPage.editView.heading")}>
          <Iconify icon="solar:pen-bold" />
        </Tooltip>
      </IconButton>
    </Stack>
  );

  return (
    <>
      <Card>
        {renderImages}

        {renderTexts}

        {renderInfo}
      </Card>
    </>
  );
}
