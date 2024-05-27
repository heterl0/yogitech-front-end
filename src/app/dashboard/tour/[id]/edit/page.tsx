import { _tours } from "@/_mock/_tour";

import { TourEditView } from "@/sections/tour/view";

// ----------------------------------------------------------------------

export const metadata = {
  title: "Dashboard: Tour Edit",
};

type Props = {
  params: {
    id: string;
  };
};

export default function TourEditPage({ params }: Props) {
  const { id } = params;

  return <TourEditView id={id} />;
}

export async function generateStaticParams() {
  return _tours.map((tour) => ({
    id: tour.id,
  }));
}
