import { useTranslation } from "@i18n/client";
import { useState } from "react";
import { GcdsInput, GcdsHeading, GcdsButton } from "@cdssnc/gcds-components-react";
import { UserData } from "../types";

interface Step2 {
  nextStep: () => void;
  initialData: UserData;
  update: (data: UserData) => void;
}

export const Step2 = ({ nextStep, initialData, update }: Step2) => {
  const { t } = useTranslation("onboard");
  const [userData, setUserData] = useState(initialData);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    update(userData);
    nextStep();
  };

  return (
    <form onSubmit={submit}>
      <div className="pb-2 my-3 flex flex-col border-black border-y-1">
        <div className="border-black border-b-1">
          <p>{t("step2.description")}</p>
          <div className="flex flex-row pt-4 gap-6">
            <div className="basis-1/2">
              <GcdsInput
                inputId="name"
                label={t("step2.form.name")}
                name="name"
                value={userData.name}
                onGcdsChange={(e) => {
                  setUserData((data) => ({
                    ...data,
                    name: e.target.value ?? "",
                  }));
                }}
              />
            </div>
            <div className="basis-1/2">
              <GcdsInput
                inputId="email"
                label={t("step2.form.email")}
                name="email"
                type="email"
                value={userData.email}
                onGcdsChange={(e) => {
                  setUserData((data) => ({
                    ...data,
                    email: e.target.value ?? "",
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="border-black border-b-1">
          <GcdsHeading tag="h2">{t("step2.jobInfo.title")}</GcdsHeading>
          <p>{t("step2.jobInfo.description")}</p>
          <div className="flex flex-row pt-4 gap-6">
            <div className="basis-1/2">
              <GcdsInput
                inputId="titleEn"
                label={t("step2.form.titleEn")}
                name="titleEn"
                value={userData.titleEn}
                onGcdsChange={(e) => {
                  setUserData((data) => ({
                    ...data,
                    titleEn: e.target.value ?? "",
                  }));
                }}
              />
            </div>
            <div className="basis-1/2">
              <GcdsInput
                inputId="titleFr"
                label={t("step2.form.titleFr")}
                name="titleFr"
                value={userData.titleFr}
                onGcdsChange={(e) => {
                  setUserData((data) => ({
                    ...data,
                    titleFr: e.target.value ?? "",
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <GcdsHeading tag="h2">{t("step2.departmentInfo.title")}</GcdsHeading>
          <p>{t("step2.departmentInfo.description")}</p>
          <div className="flex flex-row pt-4 gap-6">
            <div className="basis-1/2">
              <GcdsInput
                inputId="department"
                label={t("step2.form.department")}
                name="department"
                onGcdsChange={(e) => {
                  setUserData((data) => ({
                    ...data,
                    department: e.target.value ?? "",
                  }));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto mt-3 pb-4">
        <GcdsButton className="float-right" type="submit" buttonRole="primary">
          {t("step2.next")}
        </GcdsButton>
      </div>
    </form>
  );
};
