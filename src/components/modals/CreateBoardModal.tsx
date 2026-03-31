import { useDialog } from "@/hooks/useDialog";
import SubtasksForm from "../forms/SubtasksForm";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import TextInput from "../shared/inputs/TextInput";
import { useCreateBoardModal } from "@/hooks/useCreateBoardModal";
import { useParams, useSearchParams } from "next/navigation";
import { useBoard } from "@/hooks/useBoards";

function AddNewBoard() {
  const { dialogRef, closeDialog, handleClickOutside } = useDialog();
  const { handleSubmit, isPending } = useCreateBoardModal();
  const { boardId } = useParams();
  const { data: board } = useBoard(boardId?.toString() ?? "");
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const BUTTON_TEXTS = {
    "create-board": { idle: "Create New Board", pending: "Creating board..." },
    "edit-board": { idle: "Save Changes", pending: "Saving Changes" },
  };
  const mode = modal === "create-board" ? "create-board" : "edit-board";
  const buttonText = isPending
    ? BUTTON_TEXTS[mode].pending
    : BUTTON_TEXTS[mode].idle;

  const columnNames = board?.columns?.map((column) => ({
    id: column?.column_id,
    name: column?.name,
  }));

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
      <h2 className="mb-6 heading-l">
        {modal === "create-board" ? "Add New Board" : "Edit Board"}
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <TextInput
            label={"Name"}
            id={"boardName"}
            name={"boardName"}
            placeholder="e.g. Web Design"
            defaultValue={modal === "create-board" ? "" : board?.name}
          />
        </div>

        <SubtasksForm
          label={modal === "create-board" ? "Columns" : "Board Columns"}
          name="columnNames"
          placeholder="e.g. Todo"
          defaultValues={modal === "create-board" ? [] : columnNames}
        />
        <PrimaryButton type={"submit"} disabled={isPending}>
          {buttonText}
        </PrimaryButton>
      </form>
    </dialog>
  );
}

export default AddNewBoard;
