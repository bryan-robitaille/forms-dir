import { Suspense } from "react";
import { TeamsList } from "../TeamsList";
import { TeamsContextProvider } from "../TeamContext";
import { MembersList } from "../MembersList";

export const YourTeams = async () => {
  return (
    <div className="flex flex-row">
      <Suspense>
        <div className="basis-1/2">
          <TeamsList />
        </div>
        <div className="basis-1/2 rounded-xl bg-white pl-6">
          <MembersList />
        </div>
      </Suspense>
    </div>
  );
};
