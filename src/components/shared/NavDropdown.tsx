"use client";

import { useEffect, useRef, useState } from "react";
import IconChevronDown from "../icons/IconChevronDown";
import IconBoard from "../icons/IconBoard";
import ThemeSwitch from "./ThemeSwitch";
import BoardItem from "./BoardItem";
import { useParams } from "next/navigation";
import { useBoard, useBoards } from "@/hooks/useBoards";
import { useModalManager } from "@/hooks/useModalManager";

function NavDropodown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownref = useRef<HTMLDivElement>(null);

  const { boardId } = useParams();

  const { data: boards = [] } = useBoards();
  const { data: currentBoard } = useBoard(boardId as string);
  const { openModal } = useModalManager();

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
          <span>{currentBoard?.name ?? "Select a board"}</span>{" "}
          <IconChevronDown className="w-3 h-3" />
        </button>

        {isOpen && (
          <div className="py-4 pr-4 absolute bg-white dark:bg-black-400 z-30 rounded-lg max-w-66.25 min-w-66.25 top-[56] flex flex-col gap-4">
            <p className="pl-4 heading-s uppercase text-grey-400">
              all boards ({boards.length})
            </p>
            <div>
              <ul className="flex flex-col">
                {boards.length > 0 &&
                  boards.map((board) => (
                    <BoardItem
                      key={board.board_id}
                      board={board}
                      active={currentBoard?.board_id === board.board_id}
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    />
                  ))}
              </ul>
              <button
                className="py-3.75 w-full pl-6 lg:pl-8 flex items-center gap-4 heading-m text-purple-500 hover:cursor-pointer"
                onClick={() => {
                  openModal("create-board");
                  setIsOpen(false);
                }}
              >
                <IconBoard className="w-4 h-4 " />+ Create New Board
              </button>
            </div>
            <ThemeSwitch />
          </div>
        )}
      </nav>
      {isOpen && (
        <div className="fixed inset-0 top-15.75 bg-black/50 z-10"></div>
      )}
    </>
  );
}
export default NavDropodown;
