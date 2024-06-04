import orderBy from "lodash/orderBy";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card, { CardProps } from "@mui/material/Card";

import { fShortenNumber } from "@/utils/format-number";

import Iconify from "@/components/iconify";
import { IProfile } from "@/types/user";

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: IProfile[];
}

export default function AppTopUsers({
  title,
  subheader,
  list,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {orderBy(list, ["point"], ["desc"]).map((profile, index) => (
          <AuthorItem key={profile.id} profile={profile} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AuthorItemProps = {
  profile: IProfile;
  index: number;
};

function AuthorItem({ profile, index }: AuthorItemProps) {
  const fullName = `${profile.last_name} ${profile.first_name}`;
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={fullName} src={profile.avatar_url || ""} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{fullName}</Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Iconify icon="solar:heart-bold" width={14} sx={{ mr: 0.5 }} />
          {fShortenNumber(profile.point || 0)}
        </Typography>
      </Box>

      <Iconify
        icon="solar:cup-star-bold"
        sx={{
          p: 1,
          width: 40,
          height: 40,
          borderRadius: "50%",
          color: "primary.main",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          ...(index === 1 && {
            color: "info.main",
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
          }),
          ...(index === 2 && {
            color: "error.main",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
        }}
      />
    </Stack>
  );
}
