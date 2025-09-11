import { languages } from "@i18n/settings";
import { prisma } from "@lib/prisma";
import { auth } from "@lib/auth";
import { ProfileCard } from "./components/server/ProfileCard";
import { ProfilePanel } from "./components/ProfilePanel";
export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export default async function Profile(props: {
  params: Promise<{ locale: string; profile_id?: string }>;
}) {
  const { locale, profile_id } = await props.params;
  const session = await auth();
  if (!session || !session.user?.name) {
    throw new Error("Must be Authenticated");
  }
  const profile = await prisma.profile.findFirst({
    where: {
      id: profile_id ?? session.user?.id,
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

  return (
    <div className="flex flex-col h-full">
      <h1 className="border-black pb-4 border-b-1">Profile</h1>
      {profile.address && <ProfileCard profile={profile} />}
      <div className="border-black pb-4 border-b-1" />
      <h2>Teams</h2>
      <ProfilePanel userName={session.user.name} isSupervisor={profile.ownerOfTeams.length > 1} />
    </div>
  );
}
