"use client";
import { useState } from "react";
import { Team } from "./Team";

type TeamsProps = {
  userName: string;
  isSupervisor: boolean;
};

const tab =
  "bg-white-default text-gcds-blue-800 visited:text-gcds-blue-800 hover:bg-gcds-blue-100 hover:text-gcds-blue-800 active:border-black";
const activeTab = tab + " border-b-4";

enum panelState {
  User = "user",
  OrgChart = "orgChart",
  Teams = "teams",
  Approvals = "approvals",
}

export const ProfilePanel = ({ userName, isSupervisor }: TeamsProps) => {
  const [tab, setTab] = useState<panelState>(panelState.User);

  const userMenu = (
    <button className={tab === "user" ? activeTab : tab} onClick={() => setTab(panelState.User)}>
      {userName}
    </button>
  );
  const orgChartMenu = (
    <button
      className={tab === "orgChart" ? activeTab : tab}
      onClick={() => setTab(panelState.OrgChart)}
    >
      Org Chart
    </button>
  );

  const menuOptions = [userMenu, orgChartMenu];
  const supervisorMenuOptions = [userMenu, "teams", "approvals", orgChartMenu];

  const panelItems = {
    user: Team,
    orgChart: () => <div>Org Chart Component</div>,
    teams: () => <div>Teams Component</div>,
    approvals: () => <div>Approvals Component</div>,
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row gap-4 ">
        {isSupervisor ? supervisorMenuOptions : menuOptions}
      </div>
      <div className="bg-gcds-gray-50 flex-grow">
        <div className="my-1 mx-6">{panelItems[tab]()}</div>
      </div>
    </div>
  );
};
