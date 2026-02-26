"use client";

import { useKanbanStore } from "@/stores/boards";
import { useEffect, useRef, useState } from "react";
import IconChevronDown from "../icons/IconChevronDown";
import Link from "next/link";
import IconBoard from "../icons/IconBoard";
import IconSun from "../icons/IconSun";
import Switch from "./Switch";
import IconMoon from "../icons/IconMoon";
import { useTheme } from "next-themes";

function Dropodown() {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useKanbanStore((state) => state.boards);
  const activeBoardId = useKanbanStore((state) => state.activeBoardId);
  const activeBoard = boards.find((b) => b.id === activeBoardId)?.name;
  const setActiveBoard = useKanbanStore((state) => state.setActiveBoard);

  const { theme, setTheme } = useTheme();

  const dropdownref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownref.current &&
        !dropdownref.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <>
      <nav className="relative" ref={dropdownref}>
        <button
          className="heading-l min-w-35.75 min-h-6.25 flex items-center md:hidden gap-2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>{activeBoard ?? "Select a board"}</span>{" "}
          <IconChevronDown className="w-3 h-3" />
        </button>

        {isOpen && (
          <div className="py-4 pr-4 absolute bg-white dark:bg-black-600 z-30 rounded-lg max-w-66.25 top-[56] flex flex-col gap-4">
            <p className="pl-4 heading-s uppercase text-grey-400">
              all boards ({boards.length})
            </p>
            <div>
              <ul className="flex flex-col gap-2">
                {boards.map((board) => {
                  return (
                    <li
                      key={board.id}
                      className={`heading-m text-grey-400 rounded-tr-[100px] rounded-br-[100px] ${
                        activeBoardId === board.id
                          ? "bg-purple-500 text-white  cursor-default"
                          : ""
                      }
                        
                        `}
                    >
                      <Link
                        href={`/${board.id}`}
                        className="py-3.75 pl-6 flex items-center gap-4 w-full h-full"
                        onClick={() => {
                          setActiveBoard(board.id);
                          setIsOpen(false);
                        }}
                      >
                        <IconBoard className="w-4 h-4" />
                        {board.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <button className="py-3.75 w-full pl-6 lg:pl-8 flex items-center gap-4 heading-m text-purple-500 hover:cursor-pointer">
                <IconBoard className="w-4 h-4 " />+ Create New Board
              </button>
            </div>

            <div className="flex items-center gap-6 justify-center px-14.25 ml-4 py-3.5 bg-grey-200 dark:bg-black-600 rounded-md">
              <IconSun className="w-4.5 h-4" />
              <Switch
                onChange={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                }}
                isChecked={theme === "dark"}
                ariaLabel="Change color theme"
              />
              <IconMoon className="w-4.5 h-4" />
            </div>
          </div>
        )}
      </nav>
      {isOpen && (
        <div className="fixed inset-0 top-15.75 bg-black/50 z-10"></div>
      )}
    </>
  );
}
export default Dropodown;
