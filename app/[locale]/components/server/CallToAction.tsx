"use client";
import { useTranslation } from "@i18n/client";
import { GcdsCard } from "@cdssnc/gcds-components-react";

export const CallToAction = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(["home"]);
  const user = {
    name: "John Doe",
    title: "Software Engineer",
    company: "GC Software",
    location: "Ottawa, ON",
  };

  return (
    <div>
      {user && (
        <div className="flex flex-row mb-2 justify-center gap-6">
          <GcdsCard
            cardTitle={t("Fill out your profile")}
            imgSrc="/images/fill-out.png"
            href={`/${lng}/onboard`}
          ></GcdsCard>
          <GcdsCard
            cardTitle={t("View your new profile")}
            imgSrc="/images/take-to-profile.png"
            href={`/${lng}/profile`}
          ></GcdsCard>
        </div>
      )}
    </div>
  );
};
