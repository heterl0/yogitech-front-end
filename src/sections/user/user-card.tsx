import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Tooltip } from "@mui/material";

import { fShortenNumber } from "@/utils/format-number";
import { _mock } from "@/_mock";
import { AvatarShape } from "@/assets/illustrations";
import { IProfile } from "@/types/user";
import { paths } from "@/routes/paths";
import { useLocales } from "@/locales";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ----------------------------------------------------------------------

type Props = {
  userProfile: IProfile;
};

export default function UserCard({ userProfile }: Props) {
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
    user,
  } = userProfile;

  const { currentLang } = useLocales();

  let fullName =
    currentLang.value === "vi"
      ? `${last_name} ${first_name}`
      : `${first_name} ${last_name}`;
  if (!first_name && !last_name) {
    fullName = user;
  }

  const birthdateFormatted = format(
    birthdate ? new Date(birthdate) : new Date(),
    "dd/MM/yyyy"
  );

  const router = useRouter();

  const handleGoToProfile = () => {
    router.push(paths.dashboard.user.edit(id));
  };

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
              cursor: "pointer",
            }}
            onClick={handleGoToProfile}
          />
        </Tooltip>
        <Image
          src={_mock.image.cover(id % 21)}
          alt={fullName}
          width={320}
          height={144}
          className="aspect-video w-full rounded-sm bg-cover"
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
              : gender === 0
                ? t("userPage.female")
                : t("userPage.other")
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
          {fShortenNumber(height) === "" ? 0 : fShortenNumber(height)} /{" "}
          {fShortenNumber(weight) === "" ? 0 : fShortenNumber(weight)}
        </div>
      </Box>
    </Card>
  );
}
