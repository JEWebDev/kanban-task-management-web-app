import { useState } from "react";
import IconChevronDown from "../icons/IconChevronDown";
import { Column } from "@/types/data";
interface DropdownProps {
  columns: Column[];
}
function Dropdown({ columns }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="relative">
      <label className="body-m text-grey-400">
        Status
        <button
          type="button"
          id="dropdown-button"
          className="w-full body-l px-4 py-2 flex items-center justify-between border border-[#828fa3]/25 rounded-sm cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="dropdown-list"
          aria-labelledby="dropdow-button"
        >
          <span>Todo</span>
          <IconChevronDown className="w-3 h-2" />
        </button>
      </label>

      {isOpen && (
        <div className="py-4 px-4 absolute bg-white dark:bg-black-400 border z-100 border-[#828fa3]/25 rounded-sm flex flex-col gap-4 w-full mt-2 shadow-md">
          <ul
            className="flex flex-col body-l"
            id="dropdown-list"
            aria-labelledby="dropdown-button"
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={selectedOption}
          >
            {columns.map((column) => {
              return (
                <li
                  key={column.column_id}
                  id={column.column_id}
                  tabIndex={-1}
                  role="option"
                  aria-selected={column.column_id === selectedOption}
                  onClick={() => {
                    setSelectedOption(column.column_id);
                  }}
                >
                  {column.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
