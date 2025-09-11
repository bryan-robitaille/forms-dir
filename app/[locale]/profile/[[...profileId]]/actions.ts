"use server";
import { prisma } from "@lib/prisma";
import { AuthenticatedAction } from "@lib/auth";

export const getTeam = AuthenticatedAction(async (session, requestedId?: string) => {
  const userId = session.user?.id;

  return prisma.profile.findFirst({
    where: {
      id: requestedId ?? userId,
    },
    include: {
      team: {
        select: {
          id: true,
          nameEn: true,
          nameFr: true,
          avatarUrl: true,
          organization: true,
          owner: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              titleEn: true,
              titleFr: true,
            },
          },
          members: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
              titleEn: true,
              titleFr: true,
            },
          },
        },
      },
    },
  });
});
