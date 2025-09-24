import { useState } from "react";
import { useTranslation } from "@i18n/client";
import { TeamFormModal, FormData } from "./TeamForm";
import { createTeam } from "../../actions";

const AddTeamButton = ({ action }: { action: () => void }) => {
  const { t } = useTranslation("profile");
  return (
    <button
      type="button"
      onClick={action}
      className="text-white m-2 hover:bg-gray-400 ring-4 rounded-full focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium  text-sm text-center inline-flex items-center me-2 "
    >
      <AddIcon />
      <span className="sr-only">{t("yourTeams.teams.addTeam")}</span>
    </button>
  );
};

const AddIcon = ({ className, title }: { className?: string; title?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    width="24"
    className={className}
    viewBox="0 0 24 24"
    focusable="false"
    aria-hidden={title ? false : true}
    role={title ? "img" : "presentation"}
  >
    {title && <title>{title}</title>}
    <path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
  </svg>
);

export const AddTeam = () => {
  const [visible, setVisible] = useState(false);

  const submit = async (data: FormData) => {
    await createTeam(data);
    setVisible(false);
  };

  return (
    <>
      <AddTeamButton action={() => setVisible(true)} />
      {visible && <TeamFormModal handleClose={() => setVisible(false)} onSubmit={submit} />}
    </>
  );
};
