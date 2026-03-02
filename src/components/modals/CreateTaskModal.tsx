import { useEffect, useRef } from "react";
import PrimaryButton from "../shared/buttons/PrimaryButton";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import SubtaskInput from "../shared/inputs/SubtaskInput";
import TextInput from "../shared/inputs/TextInput";
import Dropdown from "../shared/Dropdown";

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}
function CreateTaskModal({ isOpen, onClose }: CreateTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);
  return (
    <dialog
      className="mx-auto my-auto p-6 md:p-8 max-h-168.5 md:max-h-176 bg-white dark:bg-black-600 backdrop:bg-black/50 rounded-sm md:rounded-md min-w-85.75 md:min-w-120 text-black dark:text-white"
      onClick={(e) => {
        const rect = dialogRef.current?.getBoundingClientRect();
        if (
          rect &&
          (e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom)
        ) {
          onClose();
        }
      }}
      onClose={onClose}
      ref={dialogRef}
    >
      <h2 className="heading-l dark:text-white mb-6">Add New Task</h2>

      <form className="flex flex-col gap-6 overflow-y-auto">
        <TextInput />

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

        <fieldset className="overflow-y-auto w-full flex flex-col gap-3">
          <legend className="body-m text-grey-400 mb-2">Subtasks</legend>
          <SubtaskInput />
          <SubtaskInput />
        </fieldset>
        <SecondaryButton onClick={() => {}}>+ Add New Subtask</SecondaryButton>

        <Dropdown />
        <PrimaryButton>Create Task</PrimaryButton>
      </form>
    </dialog>
  );
}
export default CreateTaskModal;
