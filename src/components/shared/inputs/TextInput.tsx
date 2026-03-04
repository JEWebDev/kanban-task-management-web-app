interface TextInputProps {
  label: string;
  id: string;
  value?: string;
  placeholder?: string;
}
function TextInput({ label, id, value, placeholder }: TextInputProps) {
  return (
    <label htmlFor={id} className="body-m text-grey-400 flex flex-col gap-2">
      {label}
      <input
        type="text"
        className="px-4 py-2 border rounded-sm border-[#828fa3]/25 body-l placeholder:body-l text-black dark:text-white placeholder:text-black/25 dark:placeholder:text-white/25"
        id={id}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

export default TextInput;
