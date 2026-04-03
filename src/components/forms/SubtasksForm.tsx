import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import { useRef, useState } from "react";
import { updateErrorsOnDelete } from "@/utils/formUtils";
import { useFormErrorContext } from "@/context/FormErrorContext";

// Updated Interface to be more specific
interface ColumnData {
  id: string | number;
  name: string;
}

interface SubtasksFormProps {
  label: string;
  name: string;
  placeholder: string;
  defaultValues?: ColumnData[];
}

function SubtasksForm({
  label,
  name,
  placeholder,
  defaultValues = [],
}: SubtasksFormProps) {
  const [textInputs, setTextInputs] = useState<ColumnData[]>(() => {
    if (defaultValues.length > 0) return defaultValues;
    return [
      { id: "new-0", name: "" },
      { id: "new-1", name: "" },
    ];
  });

  const newItemsCount = useRef(defaultValues.length > 0 ? 0 : 2);
  const { setErrors } = useFormErrorContext();

  const addTextInput = () => {
    const newId = `new-${newItemsCount.current}`;
    setTextInputs([...textInputs, { id: newId, name: "" }]);
    newItemsCount.current += 1;
  };

  const deleteTextInput = (id: string | number, index: number) => {
    const newSubtasks = textInputs.filter((item) => item.id !== id);
    setTextInputs(newSubtasks);

    setErrors((prev) => updateErrorsOnDelete(prev ?? {}, name, index));
  };

  return (
    <>
      <fieldset className="overflow-y-auto w-full max-h-29.25 flex flex-col gap-3">
        <legend className="body-m text-grey-400 mb-2">
          {`${label} (${textInputs.length})`}
        </legend>

        {textInputs.map((item, index) => (
          <SubtaskInput
            key={item.id}
            label={`${label}(${index + 1})`}
            id={item.id}
            name={`${name}.${index}`}
            idFieldName={`${name}Id.${index}`}
            placeholder={placeholder}
            defaultValue={item.name}
            onDelete={() => deleteTextInput(item.id, index)}
          />
        ))}
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
