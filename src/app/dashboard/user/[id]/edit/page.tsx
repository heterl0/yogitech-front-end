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

// export async function generateStaticParams() {
//   const res = await axiosInstance.get(endpoints.account.list);
//   const data = res.data as IAccount[];
//   return data.map((account) => ({
//     id: account.id + "",
//   }));
// }
