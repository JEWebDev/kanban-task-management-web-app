"use client";
import { useState } from "react";
import data from "@/mocks/data.json";
import { Board, Kanban } from "@/types/data";
import IconBoard from "../icons/IconBoard";
import IconHideSidebar from "../icons/IconHideSidebar";
function Sidebar() {
  const { boards } = data as Kanban;
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(boards[0]);
  return (
    <aside className="hidden py-8 pr-5 lg:pr-6 pt-8 min-w-65 lg:min-w-75 md:flex flex-col gap-13.5 justify-between md:max-w-65 lg:max-w-75 dark:bg-black-400 bg-white">
      <div id="board-list" className="w-full">
        <p className="boards-count pl-8 pb-5 dark:text-grey-400 heading-s uppercase">
          All boards ({boards.length})
        </p>
        {boards.length > 0 && (
          <ul>
            {boards.map((board, index) => {
              return (
                <li
                  key={index}
                  className={`w-full py-3.75 md:pl-6 lg:pl-8 heading-m text-grey-400 flex items-center gap-4 ${
                    selectedBoard?.name === boards[index]?.name
                      ? "bg-purple-500 text-white rounded-tr-[100px] rounded-br-[100px] cursor-default"
                      : "hover:cursor-pointer"
                  }
                  
                      `}
                  onClick={() => setSelectedBoard(boards[index])}
                >
                  <IconBoard className="w-4 h-4" />
                  {board.name}
                </li>
              );
            })}
          </ul>
        )}
        <button className="py-3.75 w-full pl-6 lg:pl-8 flex items-center gap-4 heading-m text-purple-500 hover:cursor-pointer">
          <IconBoard className="w-4 h-4 " />+ Create New Board
        </button>
      </div>

      <div>
        <button className="ml-6 lg:ml-8 text-grey-400 heading-m flex items-center gap-2.5">
          <IconHideSidebar className="w-4.5 h-4" />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
