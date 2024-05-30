// ----------------------------------------------------------------------

import ExerciseEditView from "@/sections/exercise/view/exercise-edit-view";

export const metadata = {
  title: "Dashboard: Exercise Edit",
};

type Props = {
  params: {
    id: string;
  };
};

export default function ExerciseEditPage({ params }: Props) {
  const { id } = params;

  return <ExerciseEditView id={id} />;
}
