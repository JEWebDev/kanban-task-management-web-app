import { Column } from "@/types/data";
import { useState, useRef, useEffect } from "react";

export const useDropdown = (columns: Column[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(columns[0]?.column_id);
  const [activeOption, setActiveOption] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSelection = (id: string) => {
    setSelectedOption(id);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key } = e;
    const max = columns.length;
    if (key === "ArrowDown" || key === "ArrowUp") e.preventDefault();

    if (!isOpen) {
      if (key === "ArrowDown") {
        setIsOpen(true);
        setActiveOption(0);
        return;
      }
    }

    const actions: Record<string, () => void> = {
      ArrowDown: () => setActiveOption((prev) => (prev + 1) % max),
      ArrowUp: () => setActiveOption((prev) => (prev - 1 + max) % max),
      Tab: () => setIsOpen(false),
      " ": () => handleSelection(columns[activeOption].column_id),
      Enter: () => handleSelection(columns[activeOption].column_id),
    };

    const action = actions[key];

    if (action) action();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const listElements = listRef.current?.getElementsByTagName("li");
      if (listElements && listElements[activeOption]) {
        const element = listElements[activeOption];
        element.focus();
        element.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeOption, isOpen]);

  return {
    isOpen,
    setIsOpen,
    selectedOption,
    setSelectedOption,
    activeOption,
    setActiveOption,
    handleKeyDown,
    handleSelection,
    refs: {
      containerRef: containerRef,
      buttonRef: buttonRef,
      listRef: listRef,
    },
  };
};
