import type { Profile, Address, Organization } from "@lib/prisma";

interface ProfileCard {
  profile: Profile & { address: Address | null; ownerOfTeams: { organization: Organization }[] };
}
export const ProfileCard = async ({ profile }: ProfileCard) => {
  return (
    <div className="flex flex-row gap-6">
      <div className="justify-center">
        <img
          className="w-40 h-40object-cover rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
          src={profile.avatarUrl ?? "/images/avatar-default.svg"}
          alt="Profile Image"
        />
      </div>
      <div>
        <h2 className="font-bold">{profile.name}</h2>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xl">{profile.titleEn}</p>
            <p className="text-xl">{profile.ownerOfTeams[0].organization.nameEn}</p>
          </div>
          <div>
            <p className="font-bold">Email</p>
            <p>{profile.email}</p>
          </div>
          <div className="flex flex-row gap-6">
            <div>
              <p className="font-bold">Phone</p>
              <p>{profile.mobilePhone}</p>
            </div>
            <div>
              <p className="font-bold">Address</p>
              <p>{`${profile.address?.street}, ${profile.address?.city}, ${profile.address?.province}, ${profile.address?.postalCode} `}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
