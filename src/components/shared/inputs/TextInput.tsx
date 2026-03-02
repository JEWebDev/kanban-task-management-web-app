function TextInput() {
  return (
    <label htmlFor="title" className="body-m text-grey-400 flex flex-col gap-2">
      Title
      <input
        type="text"
        className="px-4 py-2 border rounded-sm border-[#828fa3]/25 body-l placeholder:body-l text-black dark:text-white placeholder:text-black/25 dark:placeholder:text-white/25"
        id="title"
        placeholder="e.g. Take a cofee break"
      />
    </label>
  );
}

export default TextInput;
