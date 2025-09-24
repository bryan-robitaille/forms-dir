import { languages } from "@i18n/settings";
import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { ProfileCard } from "./components/ProfileCard/server/ProfileCard";
import { ProfilePanel } from "./components/ProfilePanel";
import { Team } from "./components/TeamView/server/Team";
import { OrgContainer } from "./components/OrgChart/server/OrgContainer";
import { YourTeams } from "./components/YourTeams/server/YourTeams";
import { TeamsContextProvider } from "./components/YourTeams/TeamContext";

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Profile(props: {
  params: Promise<{ locale: string; profileId?: string[] }>;
}) {
  const { locale, profileId } = await props.params;

  const session = await auth();
  if (!session || !session.user?.name || !session.user?.id) {
    throw new Error("Must be Authenticated");
  }

  const userProfileId = profileId?.[0] ?? session.user.id;

  const profile = await prisma.profile.findUnique({
    where: {
      id: userProfileId ?? session.user.id,
    },
    include: {
      address: true,
      ownerOfTeams: {
        select: {
          organization: true,
        },
      },
    },
  });

  if (profile === null) {
    return <div>Profile not found</div>;
  }

  const isSupervisor = async () => {
    if (session.user?.id === userProfileId) {
      const members = await prisma.team
        .findMany({
          where: {
            ownerId: userProfileId,
          },
          include: {
            members: {
              select: {
                id: true,
              },
            },
          },
        })
        .then((teams) => {
          return teams.flatMap((team) => {
            return team.members;
          });
        });
      if (members.length > 0) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="border-black pb-4 border-b-1">Profile</h1>
      {profile.address && <ProfileCard profile={profile} />}
      <div className="border-black pb-4 border-b-1" />
      <h2>Teams</h2>
      <TeamsContextProvider>
        <ProfilePanel
          userName={profile.name}
          isSupervisor={await isSupervisor()}
          TeamView={<Team profileId={userProfileId} />}
          OrgChartView={<OrgContainer profileId={userProfileId} locale={locale} />}
          YourTeamsView={<YourTeams />}
          ApprovalsView={<div>Your Approvals</div>}
        />
      </TeamsContextProvider>
    </div>
  );
}
