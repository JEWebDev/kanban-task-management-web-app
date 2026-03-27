import { useFormErrorContext } from "@/context/FormErrorContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { setErrors } = useFormErrorContext();
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const closeDialog = () => {
    if (window.location.search.includes("modal=")) {
      router.back();
      setErrors(undefined);
    }
  };
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target !== dialogRef.current) return;
    const rect = dialogRef.current?.getBoundingClientRect();
    if (
      rect &&
      (e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom)
    ) {
      closeDialog();
    }
  };
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return { dialogRef, router, handleSubmit, closeDialog, handleClickOutside };
};
