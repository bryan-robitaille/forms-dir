"use client";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation as reactUseTranslation } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./settings";
import { useParams } from "next/navigation";

const runsOnServerSide = typeof window === "undefined";

const languageDetector = new LanguageDetector();

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./translations/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // detect the language on client side
    detection: {
      order: ["path", "localstorage", "cookie"],
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage", "cookie"],
    },
    // Important on server-side to assert translations are loaded before rendering views.
    // Important to ensure that both languages are available for the / path simultaneously
    preload: runsOnServerSide ? languages : [],
    debug: process.env.NODE_ENV === "development" && !runsOnServerSide,
  });

export function useTranslation(ns?: string | string[], options?: Record<string, unknown>) {
  const locale = (useParams()?.locale as string) ?? null;
  const clientHook = reactUseTranslation(ns, options);
  const { i18n } = clientHook;
  if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!locale || i18n.resolvedLanguage === locale) return;
      i18n.changeLanguage(locale);
    }, [locale, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }
  return clientHook;
}
