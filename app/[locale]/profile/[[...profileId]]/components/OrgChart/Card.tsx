import styled from "styled-components";
import { useRef } from "react";

const StyledCard = styled.a<{
  $active: boolean;
  $blurred: boolean;
  $dragging: boolean;
}>`
  :hover {
    box-shadow: 0 1px 5px rgba(0,0,0,0.25), 0 1px 10px rgba(0,0,0,0.22);
    color: inherit;
    opacity: 1;
    text-decoration: none;
  }
  --line-colour: rgba(93,193,190, 1);
  background: ${(props) => (props.$active ? "#FFFFFF" : "#FFFFFF")};
  opacity: ${(props) => (props.$blurred ? "0.6" : "1")};
  border: 1px solid ${(props) => (props.$active ? "#29ABE2" : "transparent")};
  border-radius: 5px;
  width: 300px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  box-shadow: ${(props) =>
    props.$active ? "0px 0px 18px rgba(41, 171, 226, 0.3);" : "0px 0px 18px rgba(0, 0, 0, 0.15);"}
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  text-decoration: none;
  color: inherit;
  ${(props) => props.$blurred && "overflow: hidden;"}
  cursor: ${(props) => (props.$dragging ? "grab" : "pointer")};
`;

const Avatar = styled.img`
  max-width: 75px !important;
  min-width: 50px !important;
  height: 50px !important;
  border-radius: 50% !important;
  overflow: hidden;
  object-fit: cover;
  margin: 0 7px;
  align-self: center;
`;

const CardInfo = styled.div`
  align-self: center;
  padding: 0 10px;
  width: 100%;
`;

const CardName = styled.div`
  font-family: "rubik", sans-serif;
  font-size: 1.2em;
  font-weight: bold;
`;

const CardTitle = styled.div`
  font-family: "nunito", sans-serif;
  font-size: 90%;
  color: #6c757d !important;
  font-weight: 800;
`;

const CardTeam = styled.div`
  font-family: "nunito", sans-serif;
  font-size: 80%;
  color: #6c757d !important;
  font-weight: 400;
`;
// Temporary display none to style
const CardButton = styled.div`
  align-self: center;
  padding-right: 10px;
  display: none;
`;

type CardProps = {
  /** URL to navigate when card is clicked */
  cardClickUrl?: string;
  /** Function to fire when card is clicked */
  onCardClick?: () => void;
  /** ARIA label to describe the onClick action */
  label?: string;
  /** Text describing button action */
  buttonTitle: string;
  /** Function to fire when button is clicked */
  onButtonClick?: () => void;
  /** URL of image to display as avatar */
  avatar?: string;
  /** Text describing avatar image */
  avatarText: string;
  /** User's name */
  name: string;
  /** User's title */
  title?: string;
  /** User's team name */
  team?: string;
  /** true if the card should be blurred */
  blurred?: boolean;
  /** true if the card should be displayed as "active" */
  active?: boolean;
  /** true if being dragged */
  dragging?: boolean;
  /** absolute position of the card */
  position?: {
    x: number;
    y: number;
  };
};

export const Card = ({
  cardClickUrl = "#",
  onButtonClick = () => {},
  onCardClick = () => {},
  blurred = false,
  active = false,
  dragging = false,
  label = undefined,
  position = { x: 0, y: 0 },
  avatar = "/images/avatar-default.svg",
  title = "",
  team = "",
  buttonTitle,
  avatarText,
  name,
}: CardProps) => {
  const cardElement = useRef(null);

  return (
    <StyledCard
      $active={active}
      $blurred={blurred}
      $dragging={dragging}
      href={cardClickUrl}
      onClick={onCardClick}
      aria-label={label}
      tabIndex={0}
      ref={cardElement}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
    >
      <Avatar src={avatar} alt={avatarText} />
      <CardInfo>
        <CardName role="heading" aria-level={1}>
          {name}
        </CardName>
        <CardTitle role="heading" aria-level={2}>
          {title}
        </CardTitle>
        <CardTeam role="heading" aria-level={2}>
          {team}
        </CardTeam>
      </CardInfo>
      <CardButton>
        <button tabIndex={0} onClick={onButtonClick} role="button">
          {buttonTitle}
        </button>
      </CardButton>
    </StyledCard>
  );
};
