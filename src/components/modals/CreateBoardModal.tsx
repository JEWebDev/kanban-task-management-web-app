import { useDialog } from "@/hooks/useDialog";
import SubtasksForm from "../forms/SubtasksForm";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import TextInput from "../shared/inputs/TextInput";
import { useCreateBoard } from "@/hooks/useBoards";
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";

function AddNewBoard() {
  const { dialogRef, closeDialog, handleClickOutside } = useDialog();
  const { isPending } = useCreateBoard();
  const { errors, handleSubmit } = useCreateBoardModal();
  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        closeDialog();
      }}
      onClick={handleClickOutside}
      className="mx-auto my-auto p-6 md:p-8 max-h-168.5 md:max-h-176 bg-white dark:bg-black-600 backdrop:bg-black/50 rounded-sm md:rounded-md min-w-85.75 md:min-w-120 text-black dark:text-white"
    >
      <h2 className="mb-6 heading-l">Add New Board</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextInput
          label={"Name"}
          id={"boardName"}
          name={"boardName"}
          placeholder="e.g. Web Design"
          error={errors?.boardName || errors?.columnName}
        />
        <SubtasksForm label="Columns" name="columnNames" />
        <PrimaryButton type={"submit"} onClick={() => {}} disabled={isPending}>
          {isPending ? "Creating board..." : "Create New Board"}
        </PrimaryButton>
      </form>
    </dialog>
  );
}

export default AddNewBoard;
