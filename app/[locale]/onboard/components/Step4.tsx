import { useTranslation } from "@i18n/client";
import { useState, useEffect } from "react";
import { GcdsInput, GcdsButton } from "@cdssnc/gcds-components-react";
import { OnboardUserData } from "../types";
import { Search } from "@serverComponents/icons/Search";
import { searchSupervisor, getSupervisorTeams } from "../actions";

interface Step4 {
  nextStep: () => void;
  backStep: () => void;
  initialData: OnboardUserData;
  update: (data: OnboardUserData) => void;
}

export const Step4 = ({ nextStep, initialData: userData, update, backStep }: Step4) => {
  const { t } = useTranslation("onboard");
  const [formData, setFormData] = useState<OnboardUserData>(userData);
  const [supervisorList, setSupervisorList] = useState<
    { id: string; name: string; avatarUrl: string; titleEn: string; titleFr: string }[]
  >([]);

  const [teamList, setTeamList] = useState<
    {
      id: string;
      nameEn: string;
      nameFr: string;
      avatarUrl: string;
    }[]
  >([]);

  const [supervisor, setSupervisor] = useState<{
    id: string;
    name: string;
    avatarUrl: string;
    titleEn: string;
    titleFr: string;
  } | null>(null);

  const [team, setTeam] = useState<{
    id: string;
    nameEn: string;
    nameFr: string;
    avatarUrl: string;
  } | null>(null);

  useEffect(() => {
    if (supervisor?.id) {
      getSupervisorTeams(supervisor.id).then((teams) => {
        setTeamList(
          teams.map((team) => ({
            ...team,
            avatarUrl: team.avatarUrl ?? "/images/avatar-default.svg",
          }))
        );
      });
    }
  }, [supervisor]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    update({ ...userData, ...formData });
    nextStep();
  };

  const supervisorSearch = async (partialName: string) => {
    const people = (await searchSupervisor(partialName, formData.department)).map((profile) => ({
      ...profile,
      avatarUrl: profile.avatarUrl ?? "/images/avatar-default.svg",
    }));
    setSupervisorList(people);
    console.info(people);
  };

  return (
    <form onSubmit={submit}>
      <div className="pb-2 my-3 flex flex-col border-black border-y-1">
        <p>{t("step4.description")}</p>
        <div className="flex flex-row pt-4 gap-6 items-center">
          <div className="basis-1/2 flex flex-col">
            {supervisor ? (
              <div className="flex flex-row self-center">
                <div className="self-center">
                  <img
                    className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
                    src={supervisor.avatarUrl}
                    alt="Profile Avatar"
                  />
                </div>
                <div className="ml-2 text-left">
                  <div className="text-dark font-weight-bold">{supervisor.name}</div>
                  <div className="text-muted text-xs">{supervisor.titleEn}</div>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <GcdsInput
                    inputId="supervisor"
                    label={t("step4.form.supervisor")}
                    name="supervisor"
                    className="top-0"
                    onGcdsInput={(e) => {
                      if (e.target.value && e.target.value.length >= 3) {
                        supervisorSearch(e.target.value);
                      } else {
                        setSupervisorList([]);
                      }
                    }}
                  />
                  <Search className="absolute top-1/2 right-0 mx-2" />
                </div>
              </div>
            )}
          </div>
          <div className="basis-1/2 flex flex-col">
            {teamList.length > 0 && (
              <div className="overflow-y-scroll max-h-80 rounded-2xl basis-1/2 border-4 border-gcds-gray-100">
                <div> {t("step4.form.team")} </div>
                <ul>
                  {teamList.map((team) => (
                    <li key={team.id} className=" p-2 hover:bg-gcds-blue-100">
                      <button
                        className="flex flex-row gap-2 w-full"
                        onClick={() => {
                          setFormData((data) => ({
                            ...data,

                            team: team.id,
                          }));
                          setTeam(team);
                          setTeamList([]);
                        }}
                      >
                        <div className="self-center">
                          <img
                            className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
                            src={team.avatarUrl}
                            alt="Team Avatar"
                          />
                        </div>
                        <div className="ml-2 text-left">
                          <div className="text-dark font-weight-bold">{team.nameEn}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {team && (
              <div className="flex flex-row gap-2">
                <div className="self-center">
                  <img
                    className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
                    src={team.avatarUrl}
                    alt="Team Avatar"
                  />
                </div>
                <div className="ml-2 text-left">
                  <div className="text-dark font-weight-bold">{team.nameEn}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row">
          <div
            className={`overflow-y-scroll max-h-80 rounded-2xl basis-1/2 ${supervisorList.length > 0 && "border-4 border-gcds-gray-100"}`}
          >
            <ul>
              {supervisorList.map((person) => (
                <li key={person.id} className=" p-2 hover:bg-gcds-blue-100">
                  <button
                    className="flex flex-row gap-2 w-full"
                    onClick={() => {
                      setFormData((data) => ({
                        ...data,
                        supervisor: person.id,
                      }));
                      setSupervisor(person);
                      setSupervisorList([]);
                    }}
                  >
                    <div className="self-center">
                      <img
                        className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
                        src={person.avatarUrl}
                        alt="Profile Avatar"
                      />
                    </div>
                    <div className="ml-2 text-left">
                      <div className="text-dark font-weight-bold">{person.name}</div>
                      <div className="text-muted text-xs">{person.titleEn}</div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
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
