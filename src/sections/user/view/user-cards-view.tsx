"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import UserCardList from "../user-card-list";
import { useTranslation } from "react-i18next";
import { useGetUserProfiles } from "@/api/user_profile";

// ----------------------------------------------------------------------

export default function UserCardsView() {
  const { t } = useTranslation();
  const settings = useSettingsContext();
  const { profiles: userProfiles } = useGetUserProfiles();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("userPage.User Cards")}
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: t("userPage.User"), href: paths.dashboard.user.root },
          { name: t("userPage.Cards") },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList userProfiles={userProfiles} />
    </Container>
  );
}
