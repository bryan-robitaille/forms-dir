import { useTranslation } from "@i18n/client";
import { GcdsButton } from "@cdssnc/gcds-components-react";
import { LoremIpsum } from "lorem-ipsum";
import { useRouter } from "next/navigation";

export const Step5 = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation("onboard");
  const router = useRouter();

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  return (
    <>
      <div className="border-black border-y-1">
        <p className="py-2">{lorem.generateParagraphs(1)}</p>
        <p className="py-2">{lorem.generateParagraphs(1)}</p>
        <p className="py-2">{lorem.generateParagraphs(1)}</p>
      </div>
      <div className="pb-6 border-top">
        <div className="ml-auto mt-3">
          <GcdsButton
            className="float-right"
            type="button"
            buttonRole="start"
            onGcdsClick={() => router.push(`/${language}/profile`)}
          >
            {t("step5.next")}
          </GcdsButton>
        </div>
      </div>
    </>
  );
};
