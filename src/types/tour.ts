// ----------------------------------------------------------------------

export type ITourFilterValue = string | string[] | Date | ITourGuide[] | null;

export type ITourFilters = {
  tourGuides: ITourGuide[];
  destination: string[];
  services: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type ITourGuide = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type ITourBooker = {
  id: string;
  name: string;
  avatarUrl: string;
  guests: number;
};

export type ITourItem = {
  id: string;
  name: string;
  price: number;
  totalViews: number;
  tags: string[];
  content: string;
  publish: string;
  images: string[];
  durations: string;
  priceSale: number;
  services: string[];
  destination: string;
  ratingNumber: number;
  bookers: ITourBooker[];
  tourGuides: ITourGuide[];
  createdAt: Date;
  available: {
    startDate: Date;
    endDate: Date;
  };
};

export function getStatusLabel(status: number, active_status?: number): string {
  if (active_status) {
    if (active_status === 1) {
      if (status === 0) {
        return "Not start";
      } else if (status === 1) {
        return "In Progress";
      } else {
        return "Ended";
      }
    } else {
      return "Inactive";
    }
  } else {
    if (status === 0) {
      return "Not start";
    } else if (status === 1) {
      return "In Progress";
    } else {
      return "Ended";
    }
  }
}
