"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import UserCardList from "../user-card-list";
import { useGetUserProfiles } from "@/api/user_profile";

// ----------------------------------------------------------------------

export default function UserCardsView() {
  const settings = useSettingsContext();
  const { profiles: userProfiles } = useGetUserProfiles();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="User Cards"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "User", href: paths.dashboard.user.root },
          { name: "Cards" },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList userProfiles={userProfiles} />
    </Container>
  );
}
