import { useLocales as getLocales } from "@/locales";

// ----------------------------------------------------------------------

/*
 * Locales code
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */

type InputValue = string | number | null;

function getLocaleCode() {
  const {
    currentLang: {
      numberFormat: { code, currency },
    },
  } = getLocales();

  return {
    code: code ?? "en-US",
    currency: currency ?? "USD",
  };
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputValue) {
  const { code, currency } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat(code, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return "";

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputValue) {
  if (!inputValue) return "";

  if (inputValue === 0) return "0 Bytes";

  const units = ["bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}

// ----------------------------------------------------------------------

export function fSeconds(inputValue: InputValue) {
  if (!inputValue) return "";

  const totalSeconds = Number(inputValue);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = seconds.toString().padStart(2, "0");

  if (hours === 0) return `${paddedMinutes}m${paddedSeconds}s`;
  return `${paddedHours}h${paddedMinutes}m${paddedSeconds}s`;
}
