"use client";
import { useEffect, useRef } from "react";
import SecondaryButton from "../shared/buttons/SecondaryButton";

interface ConfirmationModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  isPending?: boolean;
}

export default function ConfirmationModal({
  title,
  description,
  onConfirm,
  onClose,
  isPending,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    return () => dialog?.close();
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (!dialogDimensions) return;

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="backdrop:bg-black/50 mx-auto my-auto bg-white dark:bg-black-400 p-8 rounded-lg max-w-md w-full border-none shadow-xl fixed"
    >
      <h2 className="text-red-500 heading-l mb-6">{title}</h2>
      <p className="text-grey-300 body-l mb-8">{description}</p>

      <div className="flex flex-col md:flex-row gap-4">
        <SecondaryButton
          onClick={onConfirm}
          disabled={isPending ?? false}
          className="flex-1 bg-red-500! text-white"
        >
          {isPending ? "Deleting..." : "Delete"}
        </SecondaryButton>
        <SecondaryButton
          onClick={onClose}
          disabled={isPending ?? false}
          className="flex-1"
        >
          Cancel
        </SecondaryButton>
      </div>
    </dialog>
  );
}
