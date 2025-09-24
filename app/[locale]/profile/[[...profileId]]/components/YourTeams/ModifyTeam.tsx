import { useState } from "react";

import { TeamFormModal, FormData } from "./TeamForm";
import { updateTeam } from "../../actions";
import { useTeamsContext } from "./TeamContext";
import { useTranslation } from "@i18n/client";

export const ModifyTeam = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation("profile");
  const { selectedTeam, teams, refetchData } = useTeamsContext();

  const submit = async (data: FormData) => {
    if (!data.id) {
      throw new Error("Missing ID of Team to modify");
    }
    const teamData: FormData & { id: string } = { ...data, id: data.id! };
    await updateTeam(teamData);
    await refetchData();
    setVisible(false);
  };

  return (
    <>
      <a className="text-xs" onClick={() => setVisible(true)}>
        {t("yourTeam.teams.editTeam")}
      </a>
      {visible && (
        <TeamFormModal
          handleClose={() => setVisible(false)}
          onSubmit={submit}
          initialValues={teams.filter((team) => team.id === selectedTeam)[0]}
        />
      )}
    </>
  );
};
