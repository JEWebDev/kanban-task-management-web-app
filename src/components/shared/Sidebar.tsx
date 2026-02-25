"use client";
import Link from "next/link";
import IconBoard from "../icons/IconBoard";
import IconHideSidebar from "../icons/IconHideSidebar";
import { useKanbanStore } from "@/stores/boards";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/sidebar";
import IconSun from "../icons/IconSun";
import Switch from "./Switch";
import IconMoon from "../icons/IconMoon";
import { useTheme } from "next-themes";

function Sidebar() {
  const boards = useKanbanStore((state) => state.boards);
  const activeBoardId = useKanbanStore((state) => state.activeBoardId);
  const setActiveBoard = useKanbanStore((state) => state.setActiveBoard);

  const sidebarIsOpen = useSidebarStore((state) => state.SidebarIsOpen);
  const setSidebarIsOpen = useSidebarStore((state) => state.setSidebarIsOpen);

  const { theme, setTheme } = useTheme();

  /* Hydration error patch, will dissapear when connected to the backend*/
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="hidden md:block w-75" />;
  /* Patch end */

  return (
    <aside
      className={`hidden py-8 pr-5 lg:pr-6 pt-8 min-w-65 lg:min-w-75 md:flex flex-col gap-13.5 justify-between ${!sidebarIsOpen ? "md:hidden lg:hidden" : "md:flex lg:flex"} dark:bg-black-400 bg-white border-r border-[#979797]/20`}
    >
      <div id="board-list" className="w-full">
        <p className="boards-count pl-8 pb-5 text-grey-400 heading-s uppercase">
          All boards ({boards.length})
        </p>
        {boards.length > 0 && (
          <ul>
            {boards.map((board) => {
              return (
                <li
                  key={board.id}
                  className={`heading-m text-grey-400 ${
                    activeBoardId === board.id
                      ? "bg-purple-500 text-white rounded-tr-[100px] rounded-br-[100px] cursor-default"
                      : "hover:cursor-pointer"
                  }
                
                `}
                >
                  <Link
                    href={`/${board.id}`}
                    className="py-3.75 md:pl-6 lg:pl-8 flex items-center gap-4 w-full h-full"
                    onClick={() => setActiveBoard(board.id)}
                  >
                    <IconBoard className="w-4 h-4" />
                    {board.name}
                  </Link>
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
        <div className="flex items-center justify-between max-w-62.75 px-16 py-4 ml-6 bg-grey-200 dark:bg-black-600 rounded-md">
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
        <button
          className="ml-6 py-3.5 lg:ml-8 text-grey-400 heading-m flex items-center gap-2.5 hover:cursor-pointer"
          onClick={() => {
            setSidebarIsOpen(!sidebarIsOpen);
            console.log(sidebarIsOpen);
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
