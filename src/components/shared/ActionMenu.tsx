import { useState } from "react";
import IconVerticalElipsis from "../icons/IconVerticalElipsis";

function ActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const openActionMenu = () => {
    setIsOpen(!isOpen);
  };
  const openEditModal = () => {
    setIsOpen(false);
    console.log("Opening edit modal");
  };
  const openDeleteConfirmationModal = () => {
    setIsOpen(false);
    console.log("Opening delete confirmatoin modal");
  };
  return (
    <>
      <button
        className="w-4 flex justify-end hover:cursor-pointer"
        onClick={openActionMenu}
      >
        <IconVerticalElipsis className="w-1 h-4 md:h-5" />
      </button>
      {isOpen && (
        <div className="p-4 absolute bg-white rounded-lg dark:bg-black-600 flex flex-col gap-4 top-20 right-4">
          <button
            className="w-40 h-5.75 text-left body-l text-grey-400 hover:cursor-pointer"
            onClick={openEditModal}
          >
            Edit Task
          </button>
          <button
            className="w-40 h-5.75 body-l text-left text-red-500 hover:cursor-pointer"
            onClick={openDeleteConfirmationModal}
          >
            Delete Task
          </button>
        </div>
      )}
    </>
  );
}
export default ActionMenu;
