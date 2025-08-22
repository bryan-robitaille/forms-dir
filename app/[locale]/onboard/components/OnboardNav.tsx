import { useTranslation } from "@i18n/client";
import { GcdsStepper } from "@cdssnc/gcds-components-react";

type OnboardNavProps = {
  totalSteps: number;
  currentStep: number;
};

export const OnboardNav = ({ totalSteps = 1, currentStep = 1 }: OnboardNavProps) => {
  const { t } = useTranslation("onboard");

  const words = [
    t("step1.title"),
    t("step2.title"),
    t("step3.title"),
    t("step4.title"),
    t("step5.title"),
  ];

  return (
    <GcdsStepper totalSteps={totalSteps} currentStep={currentStep} tag="h2">
      {words[currentStep - 1]}
    </GcdsStepper>
  );
};
