import { format, getTime, formatDistanceToNow, isValid } from "date-fns";

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, local?: Locale, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";
  if (date && !isValid(new Date(date))) {
    return "Invalid Date";
  }
  return date ? format(new Date(date), fm, { locale: local }) : "";
}

export function fTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "p";
  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(
  date: InputValue,
  local?: Locale,
  newFormat?: string
) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm, { locale: local }) : "";
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

export function isBetween(
  inputDate: Date | string | number,
  startDate: Date,
  endDate: Date
) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate: Date | null, endDate: Date | null) {
  const results =
    startDate && endDate
      ? new Date(startDate).getTime() > new Date(endDate).getTime()
      : false;

  return results;
}
