import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import { useState } from "react";

function SubtasksForm() {
  const [subtasks, setSubtasks] = useState([
    crypto.randomUUID(),
    crypto.randomUUID(),
  ]);

  const addSubtask = () => {
    const newSubtasks = [...subtasks, crypto.randomUUID()];
    setSubtasks(newSubtasks);
  };

  const deleteSubtask = (id: string) => {
    const newSubtasks = subtasks.filter((subtask) => subtask !== id);
    setSubtasks(newSubtasks);
  };
  return (
    <>
      <fieldset className="overflow-y-auto w-full max-h-29.25 flex flex-col gap-3">
        <legend className="body-m text-grey-400 mb-2">{`Subtasks (${subtasks.length})`}</legend>
        {subtasks.map((subtask, index) => {
          return (
            <SubtaskInput
              key={subtask}
              label={`subtask-(${index + 1})`}
              id={subtask}
              onDelete={() => deleteSubtask(subtask)}
              placeholder="e.g. Make coffee"
            />
          );
        })}
      </fieldset>
      <SecondaryButton onClick={addSubtask} className="-mt-3">
        + Add New Subtask
      </SecondaryButton>
    </>
  );
}

export default SubtasksForm;
