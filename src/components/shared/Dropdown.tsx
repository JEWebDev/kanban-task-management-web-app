import { useState } from "react";
import IconChevronDown from "../icons/IconChevronDown";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <label className="body-m text-grey-400">Status</label>
      <button
        type="button"
        className="w-full body-l px-4 py-2 flex items-center justify-between border border-[#828fa3]/25 rounded-sm cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Todo</span>
        <IconChevronDown className="w-3 h-2" />
      </button>

      {isOpen && (
        <div className="py-4 px-4 absolute bg-white dark:bg-black-400 border z-100 border-[#828fa3]/25 rounded-sm flex flex-col gap-4 w-full mt-2 shadow-md">
          <ul className="flex flex-col body-l">
            <li>Todo</li>
            <li>Doing</li>
            <li>Done</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
