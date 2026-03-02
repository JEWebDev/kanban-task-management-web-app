"use client";
import IconBoard from "../icons/IconBoard";
import IconHideSidebar from "../icons/IconHideSidebar";
import { useSidebarStore } from "@/stores/sidebar";
import BoardItem from "./BoardItem";
import ThemeSwitch from "./ThemeSwitch";
import { useParams } from "next/navigation";
import { useBoards } from "@/hooks/useBoards";

function Sidebar() {
  const { boardId } = useParams();
  const { data: boards } = useBoards();
  const sidebarIsOpen = useSidebarStore((state) => state.SidebarIsOpen);
  const setSidebarIsOpen = useSidebarStore((state) => state.setSidebarIsOpen);

  return (
    <aside
      className={`hidden py-8 pr-5 lg:pr-6 pt-8 min-w-65 lg:min-w-75 md:flex flex-col gap-13.5 justify-between ${!sidebarIsOpen ? "md:hidden lg:hidden" : "md:flex lg:flex"} dark:bg-black-400 bg-white border-r border-[#979797]/20`}
    >
      <div id="board-list" className="w-full">
        <p className="boards-count pl-8 pb-5 text-grey-400 heading-s uppercase">
          All boards ({boards?.length})
        </p>
        {boards && (
          <ul className="flex flex-col">
            {boards.map((board, index) => {
              console.log(board.board_id);
              return (
                <BoardItem
                  key={index}
                  board={board}
                  active={board.board_id === boardId}
                />
              );
            })}
          </ul>
        )}
        <button className="py-3.75 w-full pl-6 lg:pl-8 flex items-center gap-4 heading-m text-purple-500 hover:cursor-pointer">
          <IconBoard className="w-4 h-4 " />+ Create New Board
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <ThemeSwitch />
        <button
          className="pl-6 py-3.5 lg:pl-6 text-grey-400 heading-m flex items-center gap-2.5 hover:cursor-pointer hover:bg-grey-200 rounded-tr-[100px] rounded-br-[100px] hover:text-purple-500 dark:hover:bg-white"
          onClick={() => {
            setSidebarIsOpen(!sidebarIsOpen);
          }}
        >
          <IconHideSidebar className="w-4.5 h-4" />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
