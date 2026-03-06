import { useSearchParams } from "next/navigation";
import CreateTaskModal from "./modals/CreateTaskModal";

const MODAL_COMPONENTS = {
  "create-task": CreateTaskModal,
} as const;

type ModalType = keyof typeof MODAL_COMPONENTS;

function ModalContent() {
  const params = useSearchParams();
  const modalParam = params.get("modal");

  const ActiveModal = MODAL_COMPONENTS[modalParam as ModalType] ?? null;
  if (!ActiveModal) return null;
  return <>{<ActiveModal />}</>;
}

function ModalManager() {
  return (
    <>
      <ModalContent />
    </>
  );
}

export default ModalManager;
