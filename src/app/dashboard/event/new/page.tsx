// ----------------------------------------------------------------------

import EventCreateView from "@/sections/event/view/event-create-view";

export const metadata = {
  title: "Dashboard: Create New Event",
};

export default async function CreateEventPage() {
  return <EventCreateView />;
}
