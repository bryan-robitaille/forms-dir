import { useTranslation } from "@i18n/client";
import { useState } from "react";
import { GcdsInput, GcdsHeading, GcdsButton } from "@cdssnc/gcds-components-react";
import { UserData, Address } from "../types";

interface Step3 {
  nextStep: () => void;
  backStep: () => void;
  initialData: UserData;
  update: (data: UserData) => void;
}

export const Step3 = ({ nextStep, initialData: userData, update, backStep }: Step3) => {
  const { t } = useTranslation("onboard");
  const [formData, setFormData] = useState<Address>(userData.address);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    update({ ...userData, address: formData });
    nextStep();
  };

  return (
    <form onSubmit={submit}>
      <div className="pb-2 my-3 flex flex-col border-black border-y-1">
        <p>{t("step3.description")}</p>
        <div className="flex flex-row pt-4 gap-6">
          <div className="basis-lg">
            <GcdsInput
              inputId="street"
              label={t("step3.form.street")}
              name="city"
              value={formData.street}
              onGcdsChange={(e) => {
                setFormData((data) => ({
                  ...data,
                  street: e.target.value ?? "",
                }));
              }}
            />
          </div>
          <div>
            <GcdsInput
              inputId="city"
              label={t("step3.form.city")}
              name="city"
              value={formData.city}
              onGcdsChange={(e) => {
                setFormData((data) => ({
                  ...data,
                  city: e.target.value ?? "",
                }));
              }}
            />
          </div>
          <div className="basis-sm">
            <GcdsInput
              inputId="province"
              label={t("step3.form.province")}
              name="province"
              value={formData.province}
              onGcdsChange={(e) => {
                setFormData((data) => ({
                  ...data,
                  province: e.target.value ?? "",
                }));
              }}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-row pt-4 gap-6">
            <div>
              <GcdsInput
                inputId="postalCode"
                label={t("step3.form.postalCode")}
                name="postalCode"
                value={formData.postalCode}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    postalCode: e.target.value ?? "",
                  }));
                }}
              />
            </div>
            <div className="basis-md">
              <GcdsInput
                inputId="country"
                label={t("step3.form.country")}
                name="country"
                value={formData.country}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    country: e.target.value ?? "",
                  }));
                }}
              />
            </div>
            <div>
              <GcdsInput
                inputId="phone"
                label={t("step3.form.phone")}
                name="phone"
                value={formData.phone}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    phone: e.target.value ?? "",
                  }));
                }}
              />
            </div>
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
            {t("step3.previous")}
          </GcdsButton>
        </div>
        <div className="ml-auto mt-3 pb-4">
          <GcdsButton className="float-right" type="submit" buttonRole="primary">
            {t("step3.next")}
          </GcdsButton>
        </div>
      </div>
    </form>
  );
};
