import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import { alpha, useTheme } from "@mui/material/styles";

import { fShortenNumber } from "@/utils/format-number";

import { _mock } from "@/_mock";
import { AvatarShape } from "@/assets/illustrations";

import Image from "@/components/image";
// import Iconify from "@/components/iconify";

import { IProfile } from "@/types/user";
import { format } from "date-fns";
// import { stepButtonClasses } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
  userProfile: IProfile;
};

export default function UserCard({ userProfile }: Props) {
  const theme = useTheme();

  const {
    first_name,
    last_name,
    id,
    // bmi,
    avatar,
    birthdate,
    gender,
    streak,
    point,
    exp,
    // user,
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

        <Avatar
          alt={fullName}
          src={avatar || ""}
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
        secondary={`${exp} EXP`}
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
        >{`Birthday: ${birthdateFormatted}`}</Typography>
        <Typography
          variant="caption"
          sx={{ color: "text.secondary" }}
        >{`Gender: ${
          gender ? (gender === 1 ? "Male" : "Female") : "Not set"
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
            Streak
          </Typography>
          {fShortenNumber(streak)}
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.5, color: "text.secondary" }}
          >
            Point
          </Typography>

          {fShortenNumber(point)}
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.5, color: "text.secondary" }}
          >
            Height/Weight
          </Typography>
          {fShortenNumber(height)} / {fShortenNumber(weight)}
        </div>
      </Box>
    </Card>
  );
}
