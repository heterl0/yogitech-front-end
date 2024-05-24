"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

import { _accountReal } from "@/_mock";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import AccountNewEditForm from "./account-new-edit-form";

// ----------------------------------------------------------------------

type Props = {
  id: number;
};

export default function AccountEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentUser = _accountReal.find((user) => user.id === id);

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
            name: "Account",
            href: paths.dashboard.account.root,
          },
          { name: currentUser?.username },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AccountNewEditForm currentUser={currentUser} />
    </Container>
  );
}
