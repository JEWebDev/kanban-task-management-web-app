import SubtaskInput from "../shared/inputs/SubtaskInput";
import SecondaryButton from "../shared/buttons/SecondaryButton";
import { useRef, useState, useEffect } from "react";
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
  const inputRefsMap = useRef<Map<string | number, HTMLInputElement | null>>(
    new Map(),
  );
  const justAddedIdRef = useRef<string | number | null>(null);
  const { setErrors } = useFormErrorContext();

  const addTextInput = () => {
    const newId = `new-${newItemsCount.current}`;
    justAddedIdRef.current = newId;
    setTextInputs([...textInputs, { id: newId, name: "" }]);
    newItemsCount.current += 1;
  };

  useEffect(() => {
    if (justAddedIdRef.current) {
      const el = inputRefsMap.current.get(justAddedIdRef.current);
      if (el) {
        el.focus();
        justAddedIdRef.current = null;
      }
    }
  }, [textInputs]);

  const deleteTextInput = (id: string | number, index: number) => {
    const focusId =
      index > 0
        ? textInputs[index - 1].id
        : textInputs.length > 1
          ? textInputs[1].id
          : null;

    const newSubtasks = textInputs.filter((item) => item.id !== id);
    setTextInputs(newSubtasks);
    setErrors((prev) => updateErrorsOnDelete(prev ?? {}, name, index));

    setTimeout(() => {
      if (focusId) {
        const el = inputRefsMap.current.get(focusId);
        if (el) el.focus();
      }
    }, 0);
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
            ref={(el) => {
              inputRefsMap.current.set(item.id, el);
            }}
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
