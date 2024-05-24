import { _accountReal } from "@/_mock/_user";
import AccountEditView from "@/sections/account/account-edit-view";

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

  return <AccountEditView id={id} />;
}

export async function generateStaticParams() {
  return _accountReal.map((user) => ({
    id: user.id + "",
  }));
}
