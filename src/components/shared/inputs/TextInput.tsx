interface TextInputProps {
  label: string;
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  error?: string;
}
function TextInput({
  label,
  id,
  name,
  value,
  placeholder,
  error,
}: TextInputProps) {
  return (
    <label htmlFor={id} className="body-m text-grey-400 flex flex-col gap-2">
      {label}
      <div className="w-full relative">
        {error && (
          <span className="absolute top-2 right-4 text-red-500 body-l">
            {error}
          </span>
        )}
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-sm border-[#828fa3]/25 body-l placeholder:body-l text-black dark:text-white placeholder:text-black/25 dark:placeholder:text-white/25 ${error ? "border-red-500" : ""}`}
          id={id}
          name={name}
          aria-label={name}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </label>
  );
}

export default TextInput;
