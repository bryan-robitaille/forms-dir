"use server";
import { prisma } from "@lib/prisma";
import { AuthenticatedAction } from "@lib/auth";

export const getTeam = AuthenticatedAction(async (session) => {
  const userId = session.user?.id;

  return prisma.profile.findFirst({
    where: {
      id: userId,
    },
    include: {
      team: {
        select: {
          id: true,
          nameEn: true,
          nameFr: true,
          avatarUrl: true,
        },
        include: {
          owner: true,
          organization: true,
        },
      },
    },
  });
});
