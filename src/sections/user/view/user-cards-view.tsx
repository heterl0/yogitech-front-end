"use client";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { paths } from "@/routes/paths";
import { RouterLink } from "@/routes/components";

import { _userCards } from "@/_mock";

import Iconify from "@/components/iconify";
import { useSettingsContext } from "@/components/settings";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

import UserCardList from "../user-card-list";

// ----------------------------------------------------------------------

export default function UserCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="User Cards"
        links={[
          { name: "Dashboard", href: paths.dashboard.root },
          { name: "User", href: paths.dashboard.user.root },
          { name: "Cards" },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New User
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserCardList users={_userCards} />
    </Container>
  );
}
