import { useTranslation } from "@i18n/client";
import { useState } from "react";
import { GcdsInput, GcdsHeading, GcdsButton } from "@cdssnc/gcds-components-react";
import { UserData, Address } from "../types";

interface Step4 {
  nextStep: () => void;
  backStep: () => void;
  initialData: UserData;
  update: (data: UserData) => void;
}

export const Step4 = ({ nextStep, initialData: userData, update, backStep }: Step4) => {
  const { t } = useTranslation("onboard");
  const [formData, setFormData] = useState<UserData>(userData);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    update({ ...userData, ...formData });
    nextStep();
  };

  return (
    <form onSubmit={submit}>
      <div className="pb-2 my-3 flex flex-col border-black border-y-1">
        <p>{t("step4.description")}</p>
        <div className="flex flex-row pt-4 gap-6">
          <div className="basis-1/2">
            <GcdsInput
              inputId="supervisor"
              label={t("step4.form.supervisor")}
              name="supervisor"
              value={formData.supervisor}
              onGcdsChange={(e) => {
                setFormData((data) => ({
                  ...data,
                  supervisor: e.target.value ?? "",
                }));
              }}
            />
          </div>
          <div className="basis-1/2">
            <GcdsInput
              inputId="team"
              label={t("step4.form.team")}
              name="team"
              value={formData.team}
              onGcdsChange={(e) => {
                setFormData((data) => ({
                  ...data,
                  team: e.target.value ?? "",
                }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="float-right flex flex-row gap-6">
        <div className="ml-auto mt-3 pb-4">
          <GcdsButton
            className="float-right"
            type="button"
            buttonRole="secondary"
            onGcdsClick={backStep}
          >
            {t("step4.previous")}
          </GcdsButton>
        </div>
        <div className="ml-auto mt-3 pb-4">
          <GcdsButton className="float-right" type="submit" buttonRole="primary">
            {t("step4.next")}
          </GcdsButton>
        </div>
      </div>
    </form>
  );
};
