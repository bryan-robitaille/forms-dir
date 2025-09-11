"use client";
import { useState, useEffect } from "react";
import { Team } from "./Team";

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
};
const Panel = ({ tab }: PanelProps) => {
  switch (tab) {
    case panelState.User:
      return <Team />;
    case panelState.OrgChart:
      return <div>OrgChart Component</div>;
  }
};

type ProfilePanelProps = {
  userName: string;
  isSupervisor: boolean;
};
export const ProfilePanel = ({ userName, isSupervisor }: ProfilePanelProps) => {
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

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row gap-4 ">
        {userMenu}
        {orgChartMenu}
      </div>
      <div className="bg-gcds-gray-50 flex-grow">
        <div className="my-1 mx-6">
          <Panel tab={tab} />
        </div>
      </div>
    </div>
  );
};
