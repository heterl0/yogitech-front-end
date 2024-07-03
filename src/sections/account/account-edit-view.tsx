"use client";

import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";

// import { _accountReal } from "@/_mock";

import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import AccountNewEditForm from "./account-new-edit-form";
import { useGetAccount } from "@/api/account";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

type Props = {
  id: number;
};

export default function AccountEditView({ id }: Props) {
  const settings = useSettingsContext();
  const { account: currentAccount, accountMutate } = useGetAccount(id + "");
  const { t } = useTranslation();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={t("posePage.poseDetailsToolbar.edit")}
        links={[
          {
            name: "Dashboard",
            href: paths.dashboard.root,
          },
          {
            name: t("accountListView.account"),
            href: paths.dashboard.account.root,
          },
          { name: currentAccount?.username },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {currentAccount && (
        <AccountNewEditForm
          currentAccount={currentAccount}
          mutate={accountMutate}
        />
      )}
    </Container>
  );
}
