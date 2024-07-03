import { UserEditView } from "@/sections/user/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Dashboard: Account Edit",
};

type Props = {
  params: {
    id: string;
  };
};

export default function UserEditPage({ params }: Props) {
  const idString = params.id;
  const id = parseInt(idString);

  return <UserEditView id={id} />;
}
