import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import { useState } from "react";

interface SubtasksFormProps {
  label: string;
}
function SubtasksForm({ label }: SubtasksFormProps) {
  const [textInputs, setTextInputs] = useState([
    crypto.randomUUID(),
    crypto.randomUUID(),
  ]);

  const addTextInput = () => {
    const newTextInputs = [...textInputs, crypto.randomUUID()];
    setTextInputs(newTextInputs);
  };

  const deleteTextInput = (id: string) => {
    const newSubtasks = textInputs.filter((textInput) => textInput !== id);
    setTextInputs(newSubtasks);
  };
  return (
    <>
      <fieldset className="overflow-y-auto w-full max-h-29.25 flex flex-col gap-3">
        <legend className="body-m text-grey-400 mb-2">{`${label} (${textInputs.length})`}</legend>
        {textInputs.map((textInput, index) => {
          return (
            <SubtaskInput
              key={textInput}
              label={`${label}(${index + 1})`}
              id={textInput}
              name={label.toLowerCase() + (index + 1)}
              onDelete={() => deleteTextInput(textInput)}
              placeholder="e.g. Make coffee"
            />
          );
        })}
      </fieldset>
      <SecondaryButton
        onClick={addTextInput}
        className="-mt-3 hover:cursor-pointer"
      >
        + Add New {label}
      </SecondaryButton>
    </>
  );
}

export default SubtasksForm;
