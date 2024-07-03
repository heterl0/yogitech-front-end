"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import { useGetProfile } from "@/api/user_profile";
import ProfileEditForm from "../profile-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  id: number;
};

export default function UserEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { t } = useTranslation();
  const { profile: currentProfile, profileMutate } = useGetProfile(id + "");

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("eventPage.editView.heading")}
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: t("user"),
            href: paths.dashboard.user.root,
          },
          {
            name: currentProfile
              ? currentProfile.id + ""
              : t("eventPage.editView.heading"),
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentProfile && (
        <ProfileEditForm
          currentProfile={currentProfile}
          mutate={profileMutate}
        />
      )}
    </Container>
  );
}
