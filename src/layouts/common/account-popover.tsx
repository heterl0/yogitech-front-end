import { m } from "motion/react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";

// import { useMockedUser } from "@/hooks/use-mocked-user";

import { useAuthContext } from "@/auth/hooks";

import { varHover } from "@/components/animate";
import { useSnackbar } from "@/components/snackbar";
import CustomPopover, { usePopover } from "@/components/custom-popover";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { t } = useTranslation();
  const router = useRouter();

  // const { user } = useMockedUser();

  const { logout, user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const OPTIONS = (id: number, profileId: number) => [
    {
      label: t("common.home"),
      linkTo: "/",
    },
    {
      label: t("common.profile"),
      linkTo: paths.dashboard.user.edit(profileId),
    },
    {
      label: t("common.settings"),
      linkTo: paths.dashboard.account.edit(id),
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t("common.unableToLogout"), { variant: "error" });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.replace(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.profile?.avatar_url}
          alt={user?.username}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.displayName?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username || "User"}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS(user?.id, user?.profile?.id).map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          {t("common.logout")}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
