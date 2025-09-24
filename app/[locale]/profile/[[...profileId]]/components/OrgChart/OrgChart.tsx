"use client";

import { useRef, useState } from "react";
import { CardContainer } from "./CardContainer";

type OrgChart = {
  profileId: string;
  cards: any[];
  lines: any[];
};
export const OrgChart = ({ cards, lines, profileId }: OrgChart) => {
  const [panel, setPanel] = useState({
    scrollX: 0,
    scrollY: 0,
    scrollWidth: 0,
    scrollHeight: 0,
    clientWidth: 0,
    clientHeight: 0,
  });

  const cardContainer = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <CardContainer
        ref={cardContainer}
        cards={cards}
        lines={lines}
        selectedCard={cards.filter((c) => c.id === profileId)[0]}
      />
    </div>
  );
};
