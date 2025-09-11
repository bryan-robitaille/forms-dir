import { prisma } from "@lib/prisma";
import { useEffect, useState } from "react";
import { getTeam } from "../actions";

type Supervisor = {
  name: string;
  teamEn: string;
  teamFr: string;
  avatar: string;
};

const SupervisorCard = ({ name, teamEn, teamFr, avatar }: Supervisor | undefined) => {
  return (
    <div>
      <div className="font-bold mb-2">Supervisor</div>
    </div>
  );
};

export const Team = () => {
  const [team, setTeam] = useState();
  const [supervisor, setSupervisor] = useState();
  useEffect(() => {
    getTeam().then((data) => {});
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <SupervisorCard />
      </div>
    </div>
  );
};
