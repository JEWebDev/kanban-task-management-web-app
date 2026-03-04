import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";

function SubtasksForm() {
  return (
    <>
      <fieldset className="overflow-y-auto w-full max-h-29.25 flex flex-col gap-3">
        <legend className="body-m text-grey-400 mb-2">{`Subtasks`}</legend>
        <SubtaskInput
          label="subtask-1"
          id="subtask-1"
          onDelete={() => {}}
          placeholder="e.g. Make coffee"
        />
        <SubtaskInput
          label="subtask-2"
          id="subtask-2"
          onDelete={() => {}}
          placeholder="e.g. Make coffee"
        />
      </fieldset>
      <SecondaryButton onClick={() => {}} className="-mt-3">
        + Add New Subtask
      </SecondaryButton>
    </>
  );
}

export default SubtasksForm;
