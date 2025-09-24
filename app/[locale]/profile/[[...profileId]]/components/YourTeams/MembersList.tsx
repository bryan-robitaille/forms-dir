"use client";

import { useTeamsContext } from "./TeamContext";

import { useTranslation } from "@i18n/client";
import { AddPeople } from "./AddPeople";

type Members = {
  id: string;
  name: string;
  titleEn: string;
  titleFr: string;
  avatarUrl: string | null;
};

export const MembersList = () => {
  const { selectedTeamMembers } = useTeamsContext();

  const { t } = useTranslation("profile");

  return (
    <div>
      <div>
        <span className="pb-5 font-bold">
          {t("yourTeam.members.title")}
          <span className="float-right">
            <AddPeople />
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {selectedTeamMembers.map((member) => (
          <div key={member.id} className="flex flex-row gap-2">
            <div className="self-center">
              <img
                className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
                src={member.avatarUrl ?? "/images/avatar-default.svg"}
                alt="Profile Avatar"
              />
            </div>
            <div className="ml-2">
              <div className="text-dark font-weight-bold">{member.name}</div>
              <div className="text-muted text-xs">{member.titleEn}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
