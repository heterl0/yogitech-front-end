"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import { useGetProfile } from "@/api/user_profile";
import ProfileEditForm from "../profile-edit-form";

// ----------------------------------------------------------------------

type Props = {
  id: number;
};

export default function UserEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { profile: currentProfile } = useGetProfile(id + "");

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "User",
            href: paths.dashboard.user.root,
          },
          { name: currentProfile ? currentProfile.id + "" : "Edit" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentProfile && <ProfileEditForm currentProfile={currentProfile} />}
    </Container>
  );
}
