"use client";
import { useState } from "react";

const tab =
  "bg-white-default text-gcds-blue-800 visited:text-gcds-blue-800 hover:bg-gcds-blue-100 hover:text-gcds-blue-800 active:border-black";
const activeTab = tab + " border-b-4";

enum panelState {
  User = "user",
  OrgChart = "orgChart",
  Teams = "teams",
  Approvals = "approvals",
}

type PanelProps = {
  tab: panelState;
  TeamView: React.ReactNode;
  OrgChartView: React.ReactNode;
  YourTeamsView: React.ReactNode;
  ApprovalsView: React.ReactNode;
};
const Panel = ({ tab, TeamView, OrgChartView, YourTeamsView, ApprovalsView }: PanelProps) => {
  switch (tab) {
    case panelState.User:
      return TeamView;
    case panelState.OrgChart:
      return OrgChartView;
    case panelState.Teams:
      return YourTeamsView;
    case panelState.Approvals:
      return ApprovalsView;
  }
};

type ProfilePanelProps = {
  userName: string;
  isSupervisor: boolean;
  TeamView: React.ReactNode;
  OrgChartView: React.ReactNode;
  YourTeamsView: React.ReactNode;
  ApprovalsView: React.ReactNode;
};
export const ProfilePanel = ({
  userName,
  isSupervisor,
  TeamView,
  OrgChartView,
  YourTeamsView,
  ApprovalsView,
}: ProfilePanelProps) => {
  const [tab, setTab] = useState<panelState>(panelState.User);

  const userMenu = (
    <button
      key="user"
      className={tab === panelState.User ? activeTab : tab}
      onClick={() => setTab(panelState.User)}
    >
      {userName}
    </button>
  );
  const orgChartMenu = (
    <button
      key="orgChart"
      className={tab === panelState.OrgChart ? activeTab : tab}
      onClick={() => setTab(panelState.OrgChart)}
    >
      Org Chart
    </button>
  );

  const yourTeamsMenu = (
    <button
      key="yourTeams"
      className={tab === panelState.Teams ? activeTab : tab}
      onClick={() => setTab(panelState.Teams)}
    >
      Your Teams
    </button>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row gap-4 ">
        {userMenu}
        {isSupervisor && yourTeamsMenu}
        {orgChartMenu}
      </div>
      <div className="bg-gcds-gray-50 flex-grow">
        <div className="my-1 mx-6">
          <Panel
            tab={tab}
            TeamView={TeamView}
            OrgChartView={OrgChartView}
            YourTeamsView={YourTeamsView}
            ApprovalsView={ApprovalsView}
          />
        </div>
      </div>
    </div>
  );
};
