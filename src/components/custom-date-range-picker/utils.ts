import { getYear, isSameDay, isSameMonth } from "date-fns";

import { fDate } from "@/utils/format-time";

// ----------------------------------------------------------------------

export function shortDateLabel(
  startDate: Date | null,
  endDate: Date | null,
  local?: Locale
) {
  const getCurrentYear = new Date().getFullYear();

  const startDateYear = startDate ? getYear(startDate) : null;

  const endDateYear = endDate ? getYear(endDate) : null;

  const currentYear =
    getCurrentYear === startDateYear && getCurrentYear === endDateYear;

  const sameDay =
    startDate && endDate
      ? isSameDay(new Date(startDate), new Date(endDate))
      : false;

  const sameMonth =
    startDate && endDate
      ? isSameMonth(new Date(startDate), new Date(endDate))
      : false;

  if (currentYear) {
    if (sameMonth) {
      if (sameDay) {
        return fDate(endDate, local, "dd MMM yy");
      }
      return `${fDate(startDate, local, "dd")} - ${fDate(endDate, local, "dd MMM yy")}`;
    }
    return `${fDate(startDate, local, "dd MMM")} - ${fDate(endDate, local, "dd MMM yy")}`;
  }

  return `${fDate(startDate, local, "dd MMM yy")} - ${fDate(endDate, local, "dd MMM yy")}`;
}
