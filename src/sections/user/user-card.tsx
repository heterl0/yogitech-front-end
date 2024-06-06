import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Link, Tooltip } from "@mui/material";

import { fShortenNumber } from "@/utils/format-number";
import { _mock } from "@/_mock";
import { AvatarShape } from "@/assets/illustrations";
import Image from "@/components/image";
import { IProfile } from "@/types/user";
import { paths } from "@/routes/paths";

// ----------------------------------------------------------------------

type Props = {
  userProfile: IProfile;
};

export default function UserCard({ userProfile }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    first_name,
    last_name,
    id,
    avatar_url,
    birthdate,
    gender,
    streak,
    point,
    exp,
    height,
    weight,
  } = userProfile;

  const fullName = `${first_name} ${last_name}`;

  const birthdateFormatted = format(
    birthdate ? new Date(birthdate) : new Date(),
    "dd/MM/yyyy"
  );

  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: "auto",
            bottom: -26,
            position: "absolute",
          }}
        />
        <Link href={paths.dashboard.user.edit(id)}>
          <Tooltip title={t("userPage.edit_profile")} placement="left">
            <Avatar
              alt={fullName}
              src={avatar_url || ""}
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: "auto",
                position: "absolute",
              }}
            />
          </Tooltip>
        </Link>
        <Image
          src={_mock.image.cover(id % 30)}
          alt={fullName}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={fullName}
        secondary={`${exp} ${t("userPage.exp")}`}
        primaryTypographyProps={{ typography: "subtitle1" }}
        secondaryTypographyProps={{ component: "span", mt: 0.5 }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2.5 }}
        gap={"12px"}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.secondary" }}
        >{`${t("userPage.birthday")}: ${birthdateFormatted}`}</Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary" }}
        >{`${t("userPage.gender")}: ${
          gender
            ? gender === 1
              ? t("userPage.male")
              : t("userPage.female")
            : t("userPage.not_set")
        }`}</Typography>
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ py: 3, px: 3, typography: "subtitle1" }}
      >
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.5, color: "text.secondary" }}
          >
            {t("userPage.streak")}
          </Typography>
          {fShortenNumber(streak) === "" ? 0 : fShortenNumber(streak)}
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.5, color: "text.secondary" }}
          >
            {t("userPage.point")}
          </Typography>

          {fShortenNumber(point) === "" ? 0 : fShortenNumber(point)}
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.5, color: "text.secondary" }}
          >
            {t("userPage.height_weight")}
          </Typography>
          {fShortenNumber(height)} / {fShortenNumber(weight)}
        </div>
      </Box>
    </Card>
  );
}
