import { useFormErrorContext } from "@/context/FormErrorContext";
import { Ref } from "react";

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  value?: string;
  ref?: Ref<HTMLInputElement>;
  placeholder?: string;
  isLabelSROnly?: boolean;
  defaultValue?: string;
}
function TextInput({
  label,
  id,
  name,
  value,
  ref,
  placeholder,
  isLabelSROnly,
  defaultValue,
}: TextInputProps) {
  const { errors } = useFormErrorContext();
  const errorMsg = errors?.[name] || errors?.serverError;
  return (
    <>
      <label
        htmlFor={id}
        className={`body-m text-grey-400 flex flex-col gap-2 mb ${isLabelSROnly ? "sr-only" : ""}`}
      >
        {label}
      </label>
      <div className="w-full relative">
        {errorMsg && (
          <span className="absolute top-2 right-4 text-red-500 body-l">
            {errorMsg}
          </span>
        )}
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-sm border-[#828fa3]/25 body-l placeholder:body-l text-black dark:text-white placeholder:text-black/25 dark:placeholder:text-white/25 ${errorMsg ? "border-red-500" : ""}`}
          id={id}
          name={name}
          aria-label={name}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          ref={ref}
        />
      </div>
    </>
  );
}

export default TextInput;
