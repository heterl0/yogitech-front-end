"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import AccountNewEditForm from "./account-new-edit-form";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export default function AccountCreateView() {
  const settings = useSettingsContext();
  const { t } = useTranslation();
  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("accountListView.createANewUser")}
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: t("accountListView.account"),
            href: paths.dashboard.account.root,
          },
          { name: t("accountListView.newUser") },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccountNewEditForm />
    </Container>
  );
}
