import { useState } from "react";

export const useConfirmationModal = () => {
  const [IsDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openConfirmationModal = () => setIsDeleteModalOpen(true);
  const closeConfirmationModal = () => setIsDeleteModalOpen(false);

  return {
    IsDeleteModalOpen,
    setIsDeleteModalOpen,
    openConfirmationModal,
    closeConfirmationModal,
  };
};
