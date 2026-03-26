import IconCross from "@/components/icons/IconCross";
import { Ref } from "react";
import TextInput from "./TextInput";
interface SubtaskInputProps {
  label: string;
  id: number;
  name: string;
  placeholder: string;
  ref?: Ref<HTMLInputElement>;
  onDelete: () => void;
}
function SubtaskInput({
  label,
  id,
  name,
  placeholder,
  ref,
  onDelete,
}: SubtaskInputProps) {
  return (
    <div className="flex items-center gap-4 w-full">
      <TextInput
        label={label}
        id={id.toString()}
        name={name}
        placeholder={placeholder}
        ref={ref}
        isLabelSROnly={true}
      />
      <button type="button" onClick={onDelete} className="hover:cursor-pointer">
        <IconCross className="w-3.75 h-3.75" />
      </button>
    </div>
  );
}

export default SubtaskInput;
