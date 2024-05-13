"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { allLangs, defaultLang } from "./config-lang";
import { localStorageGetItem } from "@/utils/storage-available";
import { useSettingsContext } from "@/components/settings";
import i18n from "./i18n";
// ----------------------------------------------------------------------

export function useLocales() {
  const langStorage = localStorageGetItem("i18nextLng");

  const currentLang =
    allLangs.find((lang) => lang.value === langStorage) || defaultLang;

  return {
    allLangs,
    currentLang,
  };
}

// ----------------------------------------------------------------------

export function useTranslate() {
  const { t, ready } = useTranslation();

  const settings = useSettingsContext();

  const onChangeLang = useCallback(
    (newlang: string) => {
      i18n.changeLanguage(newlang);
      settings.onChangeDirectionByLang(newlang);
    },
    [settings]
  );

  return {
    t,
    i18n,
    ready,
    onChangeLang,
  };
}
