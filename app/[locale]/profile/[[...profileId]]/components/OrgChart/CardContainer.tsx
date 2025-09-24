import { useRef, forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "@i18n/client";
import { Card } from "./Card";
import { useRouter } from "next/navigation";

type CardContainerProps = {
  /** Expandable string (using !property! syntax) to pass along to card */
  cardClickUrl?: string;
  /** Fired when cards are clicked */
  onCardClick?: () => void;
  /** Expandable string (using !property! syntax) to pass along to card */
  cardLabel?: string;
  /** Expandable string (using !property! syntax) to pass along to card */
  buttonTitle?: string;
  /** Fired when buttons on cards are clicked  */
  onButtonClick?: () => void;
  /* Expandable string (using !property! syntax) to pass along to card */
  avatarText?: string;
  /* Event fired when container is scrolled */
  onScroll?: () => void;
  /** Array of cards to draw */
  cards?: {
    id: string;
    node: {
      id: string;
      avatar?: string;
      name: string;
      titleEn: string;
      titleFr: string;
      organization: {
        nameEn: string;
        nameFr: string;
      };
    };
    x: number;
    y: number;
    on_path: boolean;
  }[];
  /** Array of lines to draw */
  lines?: {
    id: string;
    d: string;
    on_path: boolean;
  }[];
  /** Styles to pass along to root div */
  style?: {};
  /** Currently selected card */
  selectedCard?: {
    id: string;
    x: number;
    y: number;
    node: {
      avatar?: string;
      name: string;
      title: string;
      x: number;
      y: number;
      on_path: boolean;
    };
  };
};

export const CardContainer = forwardRef(
  (
    {
      cards = [],
      lines = [],
      style = {},
      onScroll = undefined,
      buttonTitle = "!name!",
      avatarText = "!name!",
      cardLabel = undefined,
      cardClickUrl = undefined,
      selectedCard = undefined,
    }: CardContainerProps,
    ref
  ) => {
    const cardContainer = useRef<HTMLDivElement | null>(null);
    const {
      i18n: { language },
    } = useTranslation();

    useImperativeHandle(ref, () => {
      containerRef: cardContainer.current;
      scrollToCard: scrollToCard;
    });
    const locals = useRef<{
      newSX: number;
      newSY: number;
      lastSX: number;
      lastSY: number;
      oldHeight: number;
      oldWidth: number;
      dragging: boolean;
    }>({
      newSX: 0,
      newSY: 0,
      lastSX: 0,
      lastSY: 0,
      oldHeight: 0,
      oldWidth: 0,
      dragging: false,
    });

    const router = useRouter();

    function scrollToCard(card: CardContainerProps["selectedCard"]) {
      if (card) {
        locals.current = {
          ...locals.current,
          newSX: 0,
          newSY: 0,
          lastSX: 0,
          lastSY: 0,
        };

        window.requestAnimationFrame(() => {
          const { width, height } = cardContainer.current?.getBoundingClientRect() || {
            width: 0,
            height: 0,
          };

          const x = card.x - (width / 2 - 300 / 2);
          const y = card.y - (height / 2 - 75 / 2);

          if (cardContainer.current) {
            cardContainer.current.scrollTo({
              top: y,
              left: x,
              behavior: "smooth",
            });
          }
        });
      }
    }

    function enableDrag() {
      if (cardContainer.current) {
        cardContainer.current.addEventListener("mousedown", (e) => {
          locals.current.lastSX = e.clientX;
          locals.current.lastSY = e.clientY;
          // this.setState({ dragging: true });
          locals.current.dragging = true;
          e.preventDefault();
        });
        cardContainer.current.addEventListener("mousemove", (e) => {
          if (locals.current.dragging && cardContainer.current) {
            const scroller = cardContainer.current;
            scroller.scrollLeft -= -locals.current.lastSX + (locals.current.lastSX = e.clientX);
            locals.current.newSX = scroller.scrollLeft;
            scroller.scrollTop -= -locals.current.lastSY + (locals.current.lastSY = e.clientY);
            locals.current.newSY = scroller.scrollTop;
          }
        });
        cardContainer.current.addEventListener("mouseup", () => {
          // this.setState({ dragging: false });
          locals.current.dragging = false;
        });
        cardContainer.current.addEventListener("mouseenter", (e) => {
          if (locals.current.dragging) {
            if (e.buttons === 0) {
              // this.setState({ dragging: false });
              locals.current.dragging = false;
            }
          } else if (e.buttons === 1) {
            // this.setState({ dragging: true });
            locals.current.dragging = true;
            locals.current.lastSX = e.clientX;
            locals.current.lastSY = e.clientY;
          }
        });
      }
    }

    const svgWidth = Math.max(Math.max(...cards.map((b) => b.x)) + 300, locals.current.oldWidth);
    const svgHeight = Math.max(locals.current.oldHeight, ...cards.map((b) => b.y));
    const renderLines = (
      <svg
        style={{
          height: svgHeight,
          width: svgWidth,
        }}
      >
        {lines.map((line) => (
          <path key={line.id} d={line.d} className={line.on_path ? "onPath" : ""} />
        ))}
      </svg>
    );

    const renderCards = cards.map((card) => {
      let activeCard = false;
      if (selectedCard?.id === card.node.id) {
        activeCard = true;
      }
      return (
        <Card
          key={card.id}
          cardClickUrl={cardClickUrl}
          onCardClick={() => router.push(`/${language}/profile/${card.id}`)}
          label={cardLabel}
          buttonTitle={buttonTitle}
          onButtonClick={() => {}}
          avatar={typeof card.node.avatar === "string" ? card.node.avatar : undefined}
          avatarText={avatarText}
          name={card.node.name}
          title={language === "en" ? card.node.titleEn : card.node.titleFr}
          team={language === "en" ? card.node.organization.nameEn : card.node.organization.nameFr}
          blurred={!card.on_path}
          active={activeCard}
          dragging={locals.current.dragging}
          position={{
            x: card.x,
            y: card.y,
          }}
        />
      );
    });

    return (
      <div style={style} className="card-container" ref={cardContainer}>
        {renderLines}
        {renderCards}
      </div>
    );
  }
);
