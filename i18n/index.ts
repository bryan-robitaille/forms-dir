import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";
import { getCurrentLanguage } from "./utils";
import { cache } from "react";
import { logMessage } from "@lib/logger";

export const serverTranslation = cache(
  async (lang: string, ns?: string | string[], options?: { keyPrefix?: string }) => {
    logMessage.debug(`Server translation for ${lang} and ns: ${ns ?? "common"}`);

    const i18nextInstance = await initI18next(lang, ns ?? ["common"]);
    return {
      t: i18nextInstance.getFixedT(lang, ns, options?.keyPrefix),
      i18n: i18nextInstance,
    };
  }
);

const initI18next = async (lang: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./translations/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
};
