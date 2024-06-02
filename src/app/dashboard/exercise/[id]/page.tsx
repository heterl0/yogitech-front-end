// ----------------------------------------------------------------------

import ExerciseDetailsView from "@/sections/exercise/view/exercise-details-view";

export const metadata = {
  title: "Dashboard: Event Details",
};

type Props = {
  params: {
    id: string;
  };
};

export default function TourDetailsPage({ params }: Props) {
  const { id } = params;

  return <ExerciseDetailsView id={id} />;
}

// export async function generateStaticParams() {
//   return _tours.map((tour) => ({
//     id: tour.id,
//   }));
// }
