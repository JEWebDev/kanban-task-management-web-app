import IconChevronDown from "../icons/IconChevronDown";
import { Column } from "@/types/data";
import { useDropdown } from "@/hooks/useDropdown";
interface DropdownProps {
  columns: Column[];
  name: string;
}
function Dropdown({ columns, name }: DropdownProps) {
  const {
    isOpen,
    selectedOption,
    setIsOpen,
    handleSelection,
    handleKeyDown,
    containerRef,
    buttonRef,
    listRef,
  } = useDropdown(columns);

  return (
    <div className="relative" ref={containerRef} onKeyDown={handleKeyDown}>
      <input type="hidden" name={name} value={selectedOption} readOnly />
      <label className="body-m text-grey-400">
        Status
        <button
          ref={buttonRef}
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
          <span>
            {columns.find((column) => column.column_id === selectedOption)
              ?.name || columns[0]?.name}
          </span>
          <IconChevronDown className="w-3 h-2" />
        </button>
      </label>

      {isOpen && (
        <div className="py-4 absolute bg-white dark:bg-black-400 border z-100 border-[#828fa3]/25 rounded-sm flex flex-col gap-4 w-full mt-2 shadow-md">
          <ul
            className="flex flex-col body-l max-h-30 overflow-y-auto"
            id="dropdown-list"
            aria-labelledby="dropdown-button"
            role="listbox"
            tabIndex={-1}
            aria-activedescendant={selectedOption}
            ref={listRef}
          >
            {columns.map((column) => {
              return (
                <li
                  className={`px-4 hover:cursor-pointer hover:bg-purple-300/70 focus:bg-purple-300/70 focus:outline-none ${selectedOption === column.column_id ? "bg-purple-500" : ""}`}
                  key={column.column_id}
                  id={column.column_id}
                  tabIndex={-1}
                  role="option"
                  aria-selected={column.column_id === selectedOption}
                  onClick={() => {
                    handleSelection(column.column_id);
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
