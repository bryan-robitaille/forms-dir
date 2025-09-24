import { fakerEN_CA as faker, fakerFR_CA as fakerFr } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@lib/prisma/generatedClient";

const prisma = new PrismaClient();

async function seed() {
  // Number of Teams to create in each Organization
  const teamNumber = 500;
  // Number or profiles to create in each Organization
  const profileNumber = 4000;

  // Create n organizations
  const organizations = await prisma.organization.findMany();

  for (const organization of organizations) {
    console.info(`Creating ${profileNumber} profiles in ${organization.acronymEn}`);
    const profilePromises = Array(profileNumber)
      .fill({})
      .map(async (_, index) => {
        const name = faker.person.fullName();
        const data: Prisma.ProfileCreateInput = {
          name: name,
          email: `${name}_${index % 10}@${organization.acronymEn}-${organization.acronymFr}.gc.ca`,
          titleEn: faker.person.jobTitle(),
          titleFr: fakerFr.person.jobTitle(),
          avatarUrl: faker.image.personPortrait(),
          mobilePhone: faker.phone.number(),
          officePhone: faker.phone.number(),
          address: {
            create: {
              street: faker.location.streetAddress(),
              city: faker.location.city(),
              postalCode: faker.location.zipCode(),
              province: faker.location.state(),
              country: faker.location.country(),
            },
          },
          ownerOfTeams: {
            create: {
              nameEn: "Default Team",
              nameFr: "Équipe par défaut",
              defaultTeam: true,
              organization: { connect: { id: organization.id } },
            },
          },
        };

        return prisma.profile.create({ data });
      });
    const createdProfiles = await Promise.all(profilePromises);
    console.info(`Creating ${teamNumber} teams in ${organization.acronymEn}`);
    const teamPromises = Array(teamNumber)
      .fill({})
      .map(async (_, index) => {
        const data = {
          nameEn: `${faker.person.jobDescriptor()}, ${faker.person.jobArea()}`,
          nameFr: `${faker.person.jobDescriptor()}, ${faker.person.jobArea()}`,
          descriptionEn: faker.lorem.sentences(),
          descriptionFr: faker.lorem.sentences(),
          avatarUrl: faker.image.urlPicsumPhotos({ height: 50, width: 50 }),
          owner: {
            connect: {
              id: createdProfiles[index].id,
            },
          },
          organization: {
            connect: {
              id: organization.id,
            },
          },
        };
        return prisma.team.create({ data });
      });
    const createdTeams = await Promise.all(teamPromises);

    // Assign the various profiles to teams.
    // The profiles that are owners of teams are randomly built
    // into a hierarchy and subsequent profiles are assigned randomly
    console.info(`Placing ${createdProfiles.length} profiles into teams`);
    const teamPlacements = createdProfiles.map((profile, index) => {
      const teamPlacement = Math.floor(Math.random() * index) % teamNumber;

      return prisma.profile.update({
        where: {
          id: profile.id,
        },
        data: {
          teamId: createdTeams[teamPlacement].id,
        },
      });
    });
    await Promise.all(teamPlacements);
  }
}

seed().then(() => console.info("Seeding Complete"));
