// ----------------------------------------------------------------------

import EventEditView from "@/sections/event/view/event-edit-view";

export const metadata = {
  title: "Dashboard: Event Edit",
};

type Props = {
  params: {
    id: string;
  };
};

export default function ExerciseEditPage({ params }: Props) {
  const { id } = params;

  return <EventEditView id={id} />;
}
