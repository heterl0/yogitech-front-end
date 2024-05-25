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

// export async function generateStaticParams() {
//   const res = await axiosInstance.get(endpoints.account.list);
//   const data = res.data as IAccount[];
//   return data.map((account) => ({
//     id: account.id + "",
//   }));
// }
