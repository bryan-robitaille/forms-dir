"use client";
import { createContext, useContext, PropsWithChildren, useState, useEffect } from "react";
import { getTeams, getMembers } from "../../actions";

export type Team = {
  id: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string | null;
  descriptionFr: string | null;
  avatarUrl: string | null;
  ownerId: string;
  organizationId: string;
};

type Members = {
  id: string;
  name: string;
  titleEn: string;
  titleFr: string;
  avatarUrl: string | null;
};

const TeamsContext = createContext<{
  teams: Team[];
  selectedTeam: string;
  defaultTeam: string;
  selectedTeamMembers: Members[];
  setSelectedTeam: (teamId: string) => void;
  refreshMembers: () => Promise<void>;
  refetchData: () => Promise<void>;
}>({
  teams: [],
  selectedTeam: "",
  defaultTeam: "",
  selectedTeamMembers: [],
  setSelectedTeam: () => {},
  refreshMembers: async () => Promise.resolve(),
  refetchData: async () => Promise.resolve(),
});

type TeamsContextProvider = PropsWithChildren;

export const TeamsContextProvider = ({ children }: TeamsContextProvider) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [defaultTeam, setDefaultTeam] = useState<string>("");

  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<Members[]>([]);

  useEffect(() => {
    getTeams().then((data) => {
      const defaultTeamId = data.filter((team) => team.nameEn === "Default Team")[0].id;
      setTeams(data);
      setSelectedTeam(defaultTeamId);
      setDefaultTeam(defaultTeamId);
    });
  }, []);

  useEffect(() => {
    if (selectedTeam !== "") {
      getMembers(selectedTeam).then((data) => setSelectedTeamMembers(data?.members ?? []));
    }
  }, [selectedTeam]);

  const refreshMembers = async () => {
    await getMembers(selectedTeam).then((data) => setSelectedTeamMembers(data?.members ?? []));
  };

  const refetchData = async () => {
    await getTeams().then((data) => setTeams(data));
    await refreshMembers();
  };

  const contextValue = {
    teams,
    selectedTeam,
    defaultTeam,
    selectedTeamMembers,
    setSelectedTeam,
    refreshMembers,
    refetchData,
  };

  return <TeamsContext.Provider value={contextValue}>{children}</TeamsContext.Provider>;
};

export const useTeamsContext = () => {
  const teamsContext = useContext(TeamsContext);

  return teamsContext;
};
