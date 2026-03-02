import IconCross from "@/components/icons/IconCross";

function SubtaskInput() {
  return (
    <div className="flex items-center gap-4 w-full">
      <label
        htmlFor="title"
        className="heading-s text-grey-400 flex flex-col gap-2 sr-only"
      >
        Title
      </label>
      <input
        type="text"
        className="px-4 py-2 rounded-sm w-full border border-[#828fa3]/25 body-l placeholder:body-l placeholder:text-black/25 dark:placeholder:text-white/25"
        id="title"
        placeholder="e.g. Make Coffe"
      />
      <IconCross className="w-3.75 h-3.75" />
    </div>
  );
}

export default SubtaskInput;
