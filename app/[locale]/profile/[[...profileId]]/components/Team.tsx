import { useEffect, useState } from "react";
import { getTeam } from "../actions";
import { useParams } from "next/navigation";

type User = {
  id: string;
  name: string;
  titleEn: string;
  titleFr: string;
  avatarUrl: string;
};

type Team = {
  id: string;
  nameEn: string;
  nameFr: string;
  avatarUrl: string;
  organizationEn: string;
  organizationFr: string;
};

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <a href={`/en/profile/${user.id}`}>
      <div className="flex flex-row gap-2">
        <div className="self-center">
          <img
            className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
            src={user.avatarUrl}
            alt="Profile Avatar"
          />
        </div>
        <div className="ml-2">
          <div className="text-dark font-weight-bold">{user.name}</div>
          <small className="text-muted">{user.titleEn}</small>
        </div>
      </div>
    </a>
  );
};

const TeamCard = ({ team }: { team: Team }) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="self-center">
        <img
          className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
          src={team.avatarUrl}
          alt="Profile Avatar"
        />
      </div>
      <div className="ml-2">
        <div className="text-dark font-weight-bold">{team.nameEn}</div>
        <small className="text-muted">{team.organizationEn}</small>
      </div>
    </div>
  );
};

const ChooseSupervisor = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="self-center">
        <img
          className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
          src={"/images/avatar-default.svg"}
          alt="Profile Avatar"
        />
      </div>
      <div className="ml-2">
        <div className="text-dark font-weight-bold">Choose a Supervisor</div>
        <small className="text-muted">TBD</small>
      </div>
    </div>
  );
};

const ChooseTeam = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="self-center">
        <img
          className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
          src={"/images/avatar-default.svg"}
          alt="Team Avatar"
        />
      </div>
      <div className="ml-2">
        <div className="text-dark font-weight-bold">Choose a Team</div>
        <small className="text-muted">Request to join a team</small>
      </div>
    </div>
  );
};

const PeopleList = ({ people }: { people: User[] }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {people.map((person) => (
        <ProfileCard key={person.id} user={person} />
      ))}
    </div>
  );
};

export const Team = () => {
  const [team, setTeam] = useState<Team>();
  const [supervisor, setSupervisor] = useState<User>();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const params = useParams<{ profileId: string | string[] }>();
  useEffect(() => {
    const profileId = Array.isArray(params.profileId) ? params.profileId[0] : params.profileId;
    console.info(`UserID is: ${profileId}`);
    getTeam(profileId).then((data) => {
      if (data && data.team) {
        setSupervisor({
          id: data.team.owner.id,
          name: data?.team.owner.name,
          titleEn: data.team?.owner.titleEn,
          titleFr: data.team?.owner.titleFr,
          avatarUrl: data.team?.owner.avatarUrl ?? "/images/avatar-default.svg",
        });
        setTeam({
          id: data?.team.id,
          nameEn: data?.team.nameEn,
          nameFr: data?.team.nameFr,
          avatarUrl: data.team.avatarUrl ?? "/images/avatar-default.svg",
          organizationEn: data.team.organization.nameEn,
          organizationFr: data.team.organization.nameFr,
        });
        setTeamMembers(
          data.team.members.map((person) => {
            return {
              id: person.id,
              name: person.name,
              titleEn: person.titleEn,
              titleFr: person.titleFr,
              avatarUrl: person.avatarUrl ?? "/images/avatar-default.svg",
            };
          })
        );
      }
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-10 pb-2 mb-6 border-b-1 border-gray-300">
        <div>
          <div className="pb-2">Supervisor</div>
          {supervisor ? <ProfileCard user={supervisor} /> : <ChooseSupervisor />}
        </div>
        <div>
          <div className="pb-2">Team</div>
          {team ? <TeamCard team={team} /> : <ChooseTeam />}
        </div>
      </div>
      <div className="pb-2">People</div>
      <PeopleList people={teamMembers} />
    </div>
  );
};
