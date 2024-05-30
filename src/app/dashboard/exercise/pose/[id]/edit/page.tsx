// ----------------------------------------------------------------------

import PoseEditView from "@/sections/pose/view/pose-edit-view";

export const metadata = {
  title: "Dashboard: Pose Edit",
};

type Props = {
  params: {
    id: string;
  };
};

export default function PoseEditPage({ params }: Props) {
  const { id } = params;

  return <PoseEditView id={id} />;
}
