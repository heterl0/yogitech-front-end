// ----------------------------------------------------------------------

import PoseDetailsView from "@/sections/pose/view/pose-details-view";

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

  return <PoseDetailsView id={id} />;
}

// export async function generateStaticParams() {
//   return _tours.map((tour) => ({
//     id: tour.id,
//   }));
// }
