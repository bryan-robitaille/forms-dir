import { Modal } from "@clientComponents/Modal";
import { useRef, useState } from "react";
import { GcdsButton, GcdsInput, GcdsTextarea } from "@cdssnc/gcds-components-react";
import { useTranslation } from "@i18n/client";

type TeamFormModalProps = {
  handleClose: () => void;
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
};

export type FormData = {
  id?: string;
  nameEn: string;
  nameFr: string;
  descriptionEn: string | null;
  descriptionFr: string | null;
};
export const TeamFormModal = ({ handleClose, onSubmit, initialValues }: TeamFormModalProps) => {
  const modalRef = useRef(null);
  const { t } = useTranslation("profile");

  const [formData, setFormData] = useState<FormData>(
    initialValues ?? {
      nameEn: "",
      nameFr: "",
      descriptionEn: null,
      descriptionFr: null,
    }
  );

  return (
    <Modal
      modalRef={modalRef}
      title={formData.id ? t("yourTeam.addTeam.titleModify") : t("yourTeam.addTeam.titleAdd")}
      handleClose={handleClose}
      actions={
        <GcdsButton type="submit" size="small" onGcdsClick={() => onSubmit(formData)}>
          {formData.id ? t("yourTeam.addTeam.submitModify") : t("yourTeam.addTeam.submitAdd")}
        </GcdsButton>
      }
    >
      <>
        <div className="leading-tight">{t("yourTeam.addTeam.description")}</div>
        <form>
          <div className="flex flex-col pt-4">
            <div>
              <GcdsInput
                inputId="nameEn"
                label={t("yourTeam.addTeam.enNameInput")}
                name="nameEn"
                value={formData.nameEn}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    nameEn: e.target.value ?? "",
                  }));
                }}
              />
            </div>
            <div>
              <GcdsInput
                inputId="nameFr"
                label={t("yourTeam.addTeam.frNameInput")}
                name="nameFr"
                value={formData.nameFr}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    nameFr: e.target.value ?? "",
                  }));
                }}
              />
            </div>
            <div>
              <GcdsTextarea
                textareaId="descriptionEn"
                label={t("yourTeam.addTeam.enDescInput")}
                name="descriptionEn"
                rows={3}
                value={formData.descriptionEn ?? ""}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    descriptionEn: e.target.value ?? null,
                  }));
                }}
              />
            </div>
            <div>
              <GcdsTextarea
                textareaId="descriptionFr"
                label={t("yourTeam.addTeam.frDescInput")}
                name="descriptionFr"
                rows={3}
                value={formData.descriptionFr ?? ""}
                onGcdsChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    descriptionFr: e.target.value ?? null,
                  }));
                }}
              />
            </div>
          </div>
        </form>
      </>
    </Modal>
  );
};
