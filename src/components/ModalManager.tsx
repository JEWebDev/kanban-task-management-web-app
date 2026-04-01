import { useSearchParams } from "next/navigation";
import CreateBoardModal from "./modals/CreateBoardModal";
import CreateTaskModal from "./modals/CreateTaskModal";
import { FormErrorProvider } from "@/context/FormErrorContext";

const MODAL_COMPONENTS = {
  "create-board": CreateBoardModal,
  "edit-board": CreateBoardModal,
  "create-task": CreateTaskModal,
} as const;

type ModalType = keyof typeof MODAL_COMPONENTS;
const isvalidModal = (key: string | null): key is ModalType => {
  return key !== null && key in MODAL_COMPONENTS;
};

function ModalContent() {
  const params = useSearchParams();
  const modalParam = params.get("modal");

  if (!isvalidModal(modalParam)) return null;

  const ActiveModal = MODAL_COMPONENTS[modalParam] ?? null;
  if (!ActiveModal) return null;

  return <ActiveModal />;
}

function ModalManager() {
  return (
    <>
      <FormErrorProvider>
        <ModalContent />
      </FormErrorProvider>
    </>
  );
}

export default ModalManager;
