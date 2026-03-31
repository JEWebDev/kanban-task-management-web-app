import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import { useRef, useState } from "react";
import { updateErrorsOnDelete } from "@/utils/formUtils";
import { useFormErrorContext } from "@/context/FormErrorContext";

interface SubtasksFormProps {
  label: string;
  name: string;
  placeholder: string;
  defaultValues?: string[];
}
function SubtasksForm({
  label,
  name,
  placeholder,
  defaultValues,
}: SubtasksFormProps) {
  const initialState = () => {
    if (defaultValues && defaultValues.length > 0) {
      return defaultValues.map((_, index) => ({ id: index }));
    }
    return [{ id: 0 }, { id: 1 }];
  };
  const [textInputs, setTextInputs] = useState(initialState);

  const nextId = useRef(
    defaultValues && defaultValues.length > 0 ? defaultValues.length : 2,
  );

  const { setErrors } = useFormErrorContext();

  const addTextInput = () => {
    setTextInputs([...textInputs, { id: nextId.current }]);
    nextId.current += 1;
  };

  const deleteTextInput = (id: number, index: number) => {
    const newSubtasks = textInputs.filter((textInput) => textInput.id !== id);
    setTextInputs(newSubtasks);
    setErrors((prev) => {
      return updateErrorsOnDelete(prev ?? {}, name, index);
    });
  };

  return (
    <>
      <fieldset className="overflow-y-auto w-full max-h-29.25 flex flex-col gap-3">
        <legend className="body-m text-grey-400 mb-2">
          {`${label} (${textInputs.length})`}
        </legend>
        {textInputs.map((textInput, index) => {
          return (
            <SubtaskInput
              key={textInput.id}
              label={`${label}(${index + 1})`}
              id={textInput.id}
              name={`${name}.${index}`}
              onDelete={() => deleteTextInput(textInput.id, index)}
              placeholder={placeholder}
              defaultValue={defaultValues?.[index] ?? ""}
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
