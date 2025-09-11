import { useTranslation } from "@i18n/client";
import { useState, useEffect } from "react";
import { GcdsInput, GcdsSelect, GcdsHeading, GcdsButton } from "@cdssnc/gcds-components-react";
import { OnboardUserData } from "../types";
import { getOrganizations } from "../actions";
import { useSession } from "next-auth/react";

interface Step2 {
  nextStep: () => void;
  initialData: OnboardUserData;
  update: (data: OnboardUserData) => void;
}

interface Organization {
  id: string;
  nameEn: string;
  nameFr: string;
}
export const Step2 = ({ nextStep, initialData, update }: Step2) => {
  const { t } = useTranslation("onboard");
  const [userData, setUserData] = useState(initialData);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    getOrganizations().then((orgs) => setOrganizations(orgs));
  }, []);

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
                value={session?.user?.name ?? userData.name}
                disabled={Boolean(session?.user?.name)}
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
                disabled={Boolean(session?.user?.email)}
                value={session?.user?.email ?? userData.email}
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
              <GcdsSelect
                selectId="department"
                label={t("step2.form.department")}
                name="department"
                defaultValue={t("step2.form.select")}
                onGcdsChange={(e) => {
                  setUserData((data) => ({
                    ...data,
                    department: e.target.value ?? "",
                  }));
                }}
              >
                {organizations.map((organization) => (
                  <option value={organization.id}>{organization.nameEn}</option>
                ))}
              </GcdsSelect>
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
