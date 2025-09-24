import { OrgChart } from "../OrgChart";
import { prisma } from "@lib/prisma";

import {
  prismaSelectQuery,
  teamToNode,
  profileToNode,
  calculateOrgChart,
} from "./lib/nrc_orgchart_placement";

type OrgContainerProps = {
  profileId: string;
  locale: string;
};

export const OrgContainer = async ({ profileId, locale }: OrgContainerProps) => {
  const {
    boxes: cards,
    lines,
    miniboxes: minicards,
    minilines,
  } = await prisma.profile
    .findUniqueOrThrow({
      where: {
        id: profileId,
      },
      ...prismaSelectQuery,
    })
    .then((profile) => {
      const { team } = profile;

      const root = team
        ? teamToNode(team, locale)
        : profileToNode(locale, profile, profile.ownerOfTeams[0]);

      profile.ownerOfTeams.forEach((t) =>
        t.members.forEach((p) => root.direct_reports.push(profileToNode(locale, p, t)))
      );
      return profile
        ? calculateOrgChart({
            root,
            nodeA: { uuid: profileId },
            nodeB: undefined,
            cardHeight: undefined,
            cardWidth: undefined,
            cardPadding: undefined,
            leftGutter: undefined,
            miniCardWidth: undefined,
            miniCardHeight: undefined,
            miniCardPadding: undefined,
          })
        : {
            boxes: [],
            lines: [],
            miniboxes: [],
            minilines: [],
          };
    });

  return <OrgChart cards={cards} lines={lines} profileId={profileId} />;
};
