import IconCross from "@/components/icons/IconCross";
import { Ref } from "react";
interface SubtaskInputProps {
  label: string;
  id: string;
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
      <label
        htmlFor={id}
        className="heading-s text-grey-400 flex flex-col gap-2 sr-only"
      >
        {label}
      </label>
      <input
        type="text"
        className="px-4 py-2 rounded-sm w-full border border-[#828fa3]/25 body-l placeholder:body-l placeholder:text-black/25 dark:placeholder:text-white/25"
        id={id}
        name={name}
        placeholder={placeholder}
        ref={ref}
      />
      <button type="button" onClick={onDelete} className="hover:cursor-pointer">
        <IconCross className="w-3.75 h-3.75" />
      </button>
    </div>
  );
}

export default SubtaskInput;
