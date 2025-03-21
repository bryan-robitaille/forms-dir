import { serverTranslation } from "@i18n";

export const InfoText = async ({ lng }: { lng: string }) => {
  const { t } = await serverTranslation(lng, "home");
  return (
    <div className="m-2 mb-4 w-full">
      <div className="text-center m-4">
        <h2>{t("What is the OADW")}</h2>
      </div>
      <div className="justify-center">
        <div className="w-75">{t("Welcome block text")}</div>
      </div>
    </div>
  );
};
