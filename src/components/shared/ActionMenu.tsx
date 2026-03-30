import IconVerticalElipsis from "../icons/IconVerticalElipsis";
import { useActionMenu } from "@/hooks/useActionMenu";
interface ActionMenuProps {
  className?: string;
  onDeleteClick: () => void;
}

function ActionMenu({ className, onDeleteClick }: ActionMenuProps) {
  const { isOpen, menuRef, closeMenu, toggleMenu } = useActionMenu();
  const handleEdit = () => {
    closeMenu();
  };

  const handleDelete = () => {
    closeMenu();
    onDeleteClick();
  };
  return (
    <>
      <button
        className="w-10 flex justify-center hover:cursor-pointer"
        onClick={toggleMenu}
      >
        <IconVerticalElipsis className="w-1 h-4 md:h-5" />
      </button>
      {isOpen && (
        <div
          className={`p-4 absolute bg-white rounded-lg dark:bg-black-600 flex flex-col gap-4 top-20 right-4 ${className}`}
          ref={menuRef}
        >
          <button
            className="w-40 h-5.75 text-left body-l text-grey-400 hover:cursor-pointer"
            onClick={handleEdit}
          >
            Edit Board
          </button>
          <button
            className="w-40 h-5.75 body-l text-left text-red-500 hover:cursor-pointer"
            onClick={handleDelete}
          >
            Delete Board
          </button>
        </div>
      )}
    </>
  );
}
export default ActionMenu;
