import { PrismaClient, Prisma } from "@lib/prisma/generatedClient";

const prisma = new PrismaClient();

// Create a default top level user that owns an organization's default team

const organizationData: Prisma.OrganizationCreateInput[] = [
  {
    id: "ESDC",
    nameEn: "Employment and Social Development Canada",
    nameFr: "Emploi et Développement social Canada",
    acronymEn: "ESDC",
    acronymFr: "EDSC",
  },
  {
    id: "CDS",
    nameEn: "Canadian Digital Service",
    nameFr: "Service Numerique de Canada",
    acronymEn: "CDS",
    acronymFr: "SNC",
  },
  {
    id: "ND",
    nameEn: "National Defence",
    nameFr: "Défense nationale",
    acronymEn: "ND",
    acronymFr: "DN",
  },
];

export async function main() {
  const organizationPromises = organizationData.map(async (o) => {
    const result = await prisma.organization.upsert({ where: { id: o.id }, create: o, update: {} });
    console.info(`Created org: ${result.acronymEn} with id ${result.id}`);
  });
  await Promise.all([organizationPromises]);
}

main();
