import Box from "@mui/material/Box";

import { IProfile } from "@/types/user";

import UserCard from "./user-card";

// ----------------------------------------------------------------------

type Props = {
  userProfiles: IProfile[];
};

export default function UserCardList({ userProfiles }: Props) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
    >
      {userProfiles.map((userProfile) => (
        <UserCard key={userProfile.id} userProfile={userProfile} />
      ))}
    </Box>
  );
}
