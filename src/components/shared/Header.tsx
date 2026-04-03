"use client";
import IconAddTaskMobile from "@/components/icons/IconAddTaskMobile";
import LogoMobile from "@/components/icons/IconLogoMobile";
import IconLogoLight from "@/components/icons/IconLogoLight";
import IconLogoDark from "@/components/icons/IconLogoDark";
import { useParams } from "next/navigation";
import { useBoard, useDeleteBoard } from "@/hooks/useBoards";
import NavDropodown from "./NavDropdown";
import { useModalManager } from "@/hooks/useModalManager";
import ActionMenu from "./ActionMenu";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useConfirmationModal } from "@/hooks/useConfirmationModal";

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const { boardId } = useParams();
  const { data: board } = useBoard(boardId as string);
  const { openModal } = useModalManager();
  const { IsDeleteModalOpen, openConfirmationModal, closeConfirmationModal } =
    useConfirmationModal();
  const { mutate: deleteBoard } = useDeleteBoard();
  const handleDeleteBoard = () => {
    if (boardId) {
      deleteBoard(boardId?.toString());
      closeConfirmationModal();
    }
  };
  return (
    <>
      <header
        className={`flex justify-center h-16 md:h-20 lg:h-24 bg-white dark:bg-black-400 border-b border-[#979797]/20 dark:text-white text-black ${className}`}
      >
        <div className="w-full h-full  pr-4 lg:h-24 flex justify-between">
          <div className="pl-4 md:pl-0 flex items-center gap-4">
            <LogoMobile className="w-6 h-6 md:hidden" />
            <div className="pl-4 min-h-full md:min-w-65 lg:min-w-75  md:pr-8 md:border-r md:border-grey-300 md:dark:border-black-300 items-center hidden md:flex ">
              <IconLogoDark className="w-38.25 h-6.25 dark:hidden" />
              <IconLogoLight className="w-38.25 h-6.25 hidden dark:block" />
            </div>
            <h1 className="hidden md:block heading-xl">{board?.name ?? ""}</h1>
            <NavDropodown />
          </div>

          <div className="flex items-center">
            {boardId && (
              <>
                <button
                  className="px-4.5 py-2.5 md:px-6 md:py-3.75 bg-purple-500 rounded-3xl flex items-center justify-center enabled:hover:cursor-pointer hover:bg-purple-300 disabled:opacity-25 disabled:hover:bg-purple-500 disabled:hover:cursor-not-allowed"
                  onClick={() => {
                    openModal("create-task");
                  }}
                  disabled={!board?.columns || board.columns.length === 0}
                >
                  <IconAddTaskMobile className="md:hidden w-3 h-3" />
                  <span className="hidden md:block text-white heading-m">
                    + Add New Task
                  </span>
                </button>
                <ActionMenu
                  onDeleteClick={() => openConfirmationModal()}
                  onEditClick={() => {
                    openModal("edit-board");
                  }}
                />
              </>
            )}
          </div>
        </div>
      </header>
      {IsDeleteModalOpen && board && (
        <ConfirmationModal
          title={"Delete this board?"}
          description={`Are you sure you want to delete the '${board?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
          onConfirm={handleDeleteBoard}
          onClose={() => closeConfirmationModal()}
        />
      )}
    </>
  );
}
export default Header;
