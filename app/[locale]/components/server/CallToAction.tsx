"use client";
import { useTranslation } from "@i18n/client";
import { GcdsCard } from "@cdssnc/gcds-components-react";

export const CallToAction = ({ lng, profileExists }: { lng: string; profileExists: boolean }) => {
  const { t } = useTranslation(["home"]);

  return (
    <div>
      <div className="flex flex-row mb-2 justify-center">
        {profileExists ? (
          <GcdsCard
            cardTitle={t("View your new profile")}
            imgSrc="/images/take-to-profile.png"
            href={`/${lng}/profile`}
          ></GcdsCard>
        ) : (
          <GcdsCard
            cardTitle={t("Fill out your profile")}
            imgSrc="/images/fill-out.png"
            href={`/${lng}/onboard`}
          ></GcdsCard>
        )}
      </div>
      )
    </div>
  );
};
