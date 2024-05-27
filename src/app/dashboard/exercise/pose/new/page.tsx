// ----------------------------------------------------------------------

import PoseCreateView from "@/sections/pose/view/pose-create-view";

export const metadata = {
  title: "Dashboard: Create New Pose",
};

export default async function CreatePosePage() {
  return <PoseCreateView />;
}
