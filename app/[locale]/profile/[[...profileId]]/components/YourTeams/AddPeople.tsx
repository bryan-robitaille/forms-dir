import { Modal } from "@clientComponents/Modal";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@i18n/client";
import { GcdsButton } from "@cdssnc/gcds-components-react";
import { getMembers, updateTeamMembers } from "../../actions";
import { useTeamsContext } from "./TeamContext";

const AddTeamButton = ({ action }: { action: () => void }) => {
  const { t } = useTranslation("profile");
  return (
    <button
      type="button"
      onClick={action}
      className="text-white m-2 hover:bg-gray-400 ring-4 ring-gcds-gray-50 rounded-full focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium  text-sm text-center inline-flex items-center me-2 "
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

export const AddPeople = () => {
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<string[]>([]);
  const [people, setPeople] = useState<
    {
      name: string;
      id: string;
      avatarUrl: string | null;
      titleEn: string;
      titleFr: string;
    }[]
  >([]);
  const { t } = useTranslation("profile");

  const { teams, selectedTeam, refreshMembers } = useTeamsContext();

  useEffect(() => {
    if (visible) {
      handleOpen();
    }
  }, [visible]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => [...prev, value]);
    } else {
      setFormData((prev) => prev.filter((personId) => personId !== value));
    }
  };

  const handleOpen = async () => {
    const membersToSelect = await Promise.all(
      teams.filter((team) => team.id !== selectedTeam).map(async (team) => getMembers(team.id))
    );

    setPeople(
      membersToSelect
        .filter((team) => team !== null) // Remove null values
        .flatMap((team) => team!.members) // Extract and flatten the members array
    );
  };

  const handleClose = () => {
    setVisible(false);
    setFormData([]);
    setPeople([]);
  };

  const submit = async () => {
    await updateTeamMembers(selectedTeam, formData);
    refreshMembers();
    handleClose();
  };

  return (
    <>
      <AddTeamButton action={() => setVisible(true)} />
      {visible && (
        <Modal
          modalRef={modalRef}
          title={t("yourTeam.addPeople.title")}
          handleClose={handleClose}
          actions={
            <GcdsButton type="submit" size="small" onGcdsClick={submit}>
              {t("yourTeam.addPeople.select")}
            </GcdsButton>
          }
          maxWidth="max-w-lg"
        >
          <div className="my-6">
            <div className="leading-tight text-sm">{t("yourTeam.addPeople.description")}</div>
            <form>
              <div className="flex flex-col pt-4 gap-2">
                {people.map((person) => {
                  return (
                    <div
                      key={person.id}
                      className={`flex flex-row gap-4 ${formData?.includes(person.id) ? "bg-gcds-blue-100" : ""}`}
                    >
                      <div className="self-center">
                        <input
                          id={person.id}
                          type="checkbox"
                          className="m-1 h-5 w-5"
                          value={person.id}
                          onChange={handleSelect}
                        />
                      </div>
                      {/* Set tabIndex to -1 see https://stackoverflow.com/questions/49662769/focus-within-styles-flash-when-clicking-an-input-label  */}
                      <label tabIndex={-1} className="gc-checkbox-label" htmlFor={person.id}>
                        <div className="flex flex-row gap-2">
                          <div className="self-center">
                            <img
                              className="w-10 h-10 rounded-full ring-6 ring-gray-300 dark:ring-gray-500"
                              src={person.avatarUrl ?? "/images/avatar-default.svg"}
                              alt="Profile Avatar"
                            />
                          </div>
                          <div className="ml-2">
                            <div className="text-dark font-weight-bold">{person.name}</div>
                            <small className="text-muted">{person.titleEn}</small>
                          </div>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};
