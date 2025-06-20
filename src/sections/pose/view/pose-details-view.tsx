"use client";

import Container from "@mui/material/Container";
import { paths } from "@/routes/paths";
import { useSettingsContext } from "@/components/settings";
import { useGetPose } from "@/api/pose";
import PoseDetailsToolbar from "../pose-details-toolbar";
import PoseDetailsContent from "../pose-details-content";
import { deleter, endpoints } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useTranslate } from "@/locales";

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PoseDetailsView({ id }: Props) {
  const settings = useSettingsContext();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const { pose: currentPose } = useGetPose(id);

  const handleDelete = async () => {
    try {
      await deleter(`${endpoints.pose.details(id)}`);
      router.push(paths.dashboard.pose.root);
      enqueueSnackbar(t("posePage.poseDetailsToolbar.deleteSuccess"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <PoseDetailsToolbar
        backLink={paths.dashboard.pose.root}
        editLink={paths.dashboard.pose.edit(`${currentPose?.id}`)}
        handleDelete={handleDelete}
      />

      {currentPose && <PoseDetailsContent pose={currentPose} />}
    </Container>
  );
}
