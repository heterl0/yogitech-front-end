"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import AccountNewEditForm from "./account-new-edit-form";

// ----------------------------------------------------------------------

export default function AccountCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Create a new user"
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: "Account",
            href: paths.dashboard.account.root,
          },
          { name: "New user" },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccountNewEditForm />
    </Container>
  );
}
