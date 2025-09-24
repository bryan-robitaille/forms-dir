"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "@i18n/client";
import { GcdsButton } from "@cdssnc/gcds-components-react";
import { Close } from "@serverComponents/icons/Close";
import { cn } from "@lib/styling";

export const Modal = ({
  modalRef,
  children,
  title,
  actions,
  className,
  handleClose,
  maxWidth = "max-w-4xl",
}: {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  children: React.ReactElement;
  title?: string;
  actions?: React.ReactElement;
  className?: string;
  handleClose?: () => void;
  maxWidth?: string;
}) => {
  const { t } = useTranslation("modal");
  const [isOpen, changeOpen] = useState(true);
  const close = useCallback(() => {
    modalRef.current?.close();
    handleClose && handleClose();
    changeOpen(false);
  }, [modalRef, handleClose]);

  useEffect(() => {
    const dialog = modalRef?.current;
    if (isOpen) {
      dialog?.showModal();
    }
    return () => dialog?.close();
    // see: https://github.com/facebook/react/issues/24399
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Close modal if "ESC" key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleClose && handleClose();
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [close, handleClose]);

  // Avoids duplicate id for the case of more than one dialog in the DOM
  const modalRandomId = useRef(Math.random().toString(36).slice(2, 9));

  return (
    <dialog
      className="size-full bg-transparent bg-clip-padding p-0 justify-center content-center"
      {...(title && { "aria-labelledby": `modal-title-${modalRandomId.current}` })}
      ref={modalRef}
      data-testid="dialog"
    >
      <div
        className={cn(
          `relative max-h-[90%] overflow-y-auto rounded-xl border-1 border-slate-500 bg-white tablet:mx-auto ${maxWidth} laptop:mt-24`,
          className
        )}
      >
        {title && (
          <div className="border-b-[0.5px] border-slate-500 bg-slate-50">
            <h2
              className="ml-4 mt-4 inline-block pb-4 text-2xl"
              id={`modal-title-${modalRandomId.current}`}
              tabIndex={-1}
            >
              {title}
            </h2>
          </div>
        )}

        <div className="px-4">{children}</div>

        <div className="sticky bottom-0 flex border-t-[0.5px] border-slate-500 bg-white p-4">
          <div className="ml-auto flex flex-row gap-4">
            {actions}

            <GcdsButton type="button" buttonRole="secondary" size="small" onGcdsClick={close}>
              {t("cancel")}
            </GcdsButton>
          </div>
        </div>
        <button
          className="group absolute right-0 top-0 z-[1000] mr-4 mt-4 text-gray-300 m-2 ring-4 rounded-full focus:ring-4 focus:outline-none focus:ring-gray-600 hover:bg-gray-200 font-medium  text-sm text-center inline-flex items-center me-2 "
          aria-label={t("close")}
          onClick={close}
        >
          <span className="block">
            <Close className="inline-block fill-gray-400" />
          </span>
        </button>
      </div>
    </dialog>
  );
};
