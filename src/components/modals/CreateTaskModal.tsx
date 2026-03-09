import PrimaryButton from "../shared/buttons/PrimaryButton";
import TextInput from "../shared/inputs/TextInput";
import Dropdown from "../shared/Dropdown";
import SubtasksForm from "../forms/SubtasksForm";
import { useDialog } from "@/hooks/useDialog";
import { useParams } from "next/navigation";
import { useBoard } from "@/hooks/useBoards";
import { useMemo } from "react";

function CreateTaskModal() {
  const { dialogRef, handleSubmit, closeDialog, handleClickOutside } =
    useDialog();

  const { boardId } = useParams();
  const { data: board } = useBoard(boardId as string);
  const columns = useMemo(() => board?.columns || [], [board?.columns]);

  return (
    <dialog
      className="mx-auto my-auto p-6 md:p-8 max-h-168.5 md:max-h-176 bg-white dark:bg-black-600 backdrop:bg-black/50 rounded-sm md:rounded-md min-w-85.75 md:min-w-120 text-black dark:text-white"
      onClick={handleClickOutside}
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        closeDialog();
      }}
    >
      <h2 className="heading-l dark:text-white mb-6">Add New Task</h2>

      <form
        className="flex flex-col gap-6 overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <TextInput
          label="Title"
          id={"title"}
          placeholder={"e.g. Take a coffee break"}
        />

        <label
          htmlFor="description"
          className="body-m text-grey-400 flex flex-col gap-2"
        >
          Description
          <textarea
            className="px-4 py-2 resize-none border border-[#828fa3]/25 body-l text-black dark:text-white placeholder:body-l placeholder:text-black/25 dark:placeholder:text-white/25 min-h-28 rounded-sm"
            id="description"
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </label>

        <SubtasksForm label="Subtasks" />

        <Dropdown columns={columns} name="column_id" />
        <PrimaryButton type={"submit"} onClick={() => {}}>
          Create Task
        </PrimaryButton>
      </form>
    </dialog>
  );
}
export default CreateTaskModal;
