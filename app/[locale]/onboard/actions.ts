"use server";
import { prisma } from "@lib/prisma";
import type { OnboardUserData } from "./types";
import { AuthenticatedAction } from "@lib/auth";
import { faker } from "@faker-js/faker";

export const onboardProfile = AuthenticatedAction(async (session, formData: OnboardUserData) => {
  return prisma.profile.create({
    data: {
      id: session.user?.id,
      name: session.user?.name ?? formData.name,
      email: session.user?.email ?? formData.name,
      titleEn: formData.titleEn,
      titleFr: formData.titleFr,
      mobilePhone: formData.address.phone,
      avatarUrl: session.user?.image ?? faker.image.avatar(),
      address: {
        create: {
          street: formData.address.street,
          city: formData.address.city,
          province: formData.address.province,
          postalCode: formData.address.postalCode,
          country: formData.address.country,
        },
      },
      ownerOfTeams: {
        create: {
          nameEn: "Default Team",
          nameFr: "Équipe par défaut",
          organization: { connect: { id: formData.department } },
        },
      },
    },
  });
});

export const getOrganizations = AuthenticatedAction(async () => {
  return prisma.organization.findMany({
    select: {
      id: true,
      nameEn: true,
      nameFr: true,
    },
  });
});
