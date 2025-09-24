"use server";
import { prisma } from "@lib/prisma";
import { AuthenticatedAction } from "@lib/auth";
import { revalidatePath } from "next/cache";

export const getTeams = AuthenticatedAction(async (session) => {
  return prisma.team.findMany({
    where: {
      ownerId: session.user?.id,
    },
  });
});

export const getMembers = AuthenticatedAction(async (session, teamId: string) => {
  return prisma.team.findUnique({
    where: {
      id: teamId,
      ownerId: session.user?.id,
    },
    select: {
      members: {
        select: {
          id: true,
          name: true,
          titleEn: true,
          titleFr: true,
          avatarUrl: true,
        },
      },
    },
  });
});

export const createTeam = AuthenticatedAction(
  async (
    session,
    {
      nameEn,
      nameFr,
      descriptionEn,
      descriptionFr,
    }: {
      nameEn: string;
      nameFr: string;
      descriptionEn: string | null;
      descriptionFr: string | null;
    }
  ) => {
    if (!session.user?.id) {
      throw new Error("User missing ID");
    }
    const organizationId = await prisma.profile
      .findUniqueOrThrow({
        where: {
          id: session.user?.id,
        },
        select: {
          ownerOfTeams: {
            select: {
              organizationId: true,
            },
          },
        },
      })
      .then((data) => {
        return data.ownerOfTeams[0].organizationId;
      });

    await prisma.team.create({
      data: {
        nameEn: nameEn,
        nameFr: nameFr,
        descriptionEn: descriptionEn,
        descriptionFr: descriptionFr,
        ownerId: session.user?.id,
        organizationId: organizationId,
      },
    });
    revalidatePath("/[locale]/profile", "page");
    revalidatePath("/[locale]/profile/[[...profileId]]", "page");
  }
);

export const updateTeamMembers = AuthenticatedAction(
  async (session, teamId: string, teamMembers: string[]) => {
    if (!session.user?.id) {
      throw new Error("No user Session");
    }
    await prisma.team.update({
      where: {
        id: teamId,
        ownerId: session.user.id,
      },
      data: {
        members: {
          connect: teamMembers.map((personId) => ({
            id: personId,
          })),
        },
      },
    });
    revalidatePath("/[locale]/profile", "page");
    revalidatePath("/[locale]/profile/[[...profileId]]", "page");
  }
);

export const updateTeam = AuthenticatedAction(
  async (
    session,
    {
      id,
      nameEn,
      nameFr,
      descriptionEn,
      descriptionFr,
    }: {
      id: string;
      nameEn: string;
      nameFr: string;
      descriptionEn: string | null;
      descriptionFr: string | null;
    }
  ) => {
    if (!session.user?.id) {
      throw new Error("No user Session");
    }

    await prisma.team.update({
      where: {
        id: id,
        ownerId: session.user.id,
      },
      data: {
        nameEn,
        nameFr,
        descriptionEn,
        descriptionFr,
      },
    });
    revalidatePath("/[locale]/profile", "page");
    revalidatePath("/[locale]/profile/[[...profileId]]", "page");
  }
);
