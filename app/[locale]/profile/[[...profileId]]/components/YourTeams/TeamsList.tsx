"use client";

import { useTranslation } from "@i18n/client";
import { useTeamsContext, Team } from "./TeamContext";
import { AddTeam } from "./AddTeam";
import { ModifyTeam } from "./ModifyTeam";

const TeamCard = ({
  nameEn,
  nameFr,
  descriptionEn,
  descriptionFr,
  avatarUrl,
  active,
}: Team & { active: boolean }) => {
  const {
    i18n: { language },
    t,
  } = useTranslation("profile");

  return (
    <div className={`flex flex-row gap-2 p-4 shadow-lw rounded-l-2xl ${active && "bg-white"}`}>
      <div className="self-center shrink-0">
        <img
          className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
          src={avatarUrl ?? "/images/avatar-default.svg"}
          alt="Team Avatar"
        />
      </div>
      <div className="ml-2 text-left">
        <div className="text-dark font-weight-bold">{language === "en" ? nameEn : nameFr}</div>
        {nameEn === "Default Team" ? (
          <div className="text-muted text-xs">{t("yourTeam.teams.defaultDescription")}</div>
        ) : (
          <div className="text-muted text-xs">
            {language === "en" ? descriptionEn : descriptionFr}
          </div>
        )}
        <div className="flex flex-row gap-6 mt-1">
          <ModifyTeam />
          <a className="text-xs">{t("yourTeam.teams.deleteTeam")}</a>
        </div>
      </div>
    </div>
  );
};

type TeamsList = {};
export const TeamsList = () => {
  const { teams, selectedTeam, setSelectedTeam } = useTeamsContext();
  const { t } = useTranslation("profile");

  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="pb-5 font-bold">{t("yourTeam.teams.title")}</span>
        <span className="float-right">
          <AddTeam />
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {teams.map((team) => (
          <div key={team.id} onClick={() => setSelectedTeam(team.id)}>
            <TeamCard {...team} active={team.id === selectedTeam} />
          </div>
        ))}
      </div>
    </div>
  );
};
