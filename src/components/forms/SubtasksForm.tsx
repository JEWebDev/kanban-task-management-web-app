import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import { useRef, useState } from "react";

interface SubtasksFormProps {
  label: string;
  name: string;
}
function SubtasksForm({ label, name }: SubtasksFormProps) {
  const [textInputs, setTextInputs] = useState([{ id: 0 }, { id: 1 }]);

  const nextId = useRef(2);

  const addTextInput = () => {
    setTextInputs([...textInputs, { id: nextId.current }]);
    nextId.current += 1;
  };

  const deleteTextInput = (id: number) => {
    const newSubtasks = textInputs.filter((textInput) => textInput.id !== id);
    setTextInputs(newSubtasks);
  };
  return (
    <>
      <fieldset className="overflow-y-auto w-full max-h-29.25 flex flex-col gap-3">
        <legend className="body-m text-grey-400 mb-2">{`${label} (${textInputs.length})`}</legend>
        {textInputs.map((textInput, index) => {
          return (
            <SubtaskInput
              key={textInput.id}
              label={`${label}(${index + 1})`}
              id={textInput.id}
              name={`${name}.${index}`}
              onDelete={() => deleteTextInput(textInput.id)}
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
