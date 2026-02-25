"use client";
import IconAddTaskMobile from "@/components/icons/IconAddTaskMobile";
import LogoMobile from "@/components/icons/IconLogoMobile";
import IconVerticalElipsis from "@/components/icons/IconVerticalElipsis";
import IconChevronDown from "@/components/icons/IconChevronDown";
import IconLogoLight from "@/components/icons/IconLogoLight";
import IconLogoDark from "@/components/icons/IconLogoDark";
import useActiveBoard from "@/hooks/useActiveBoard";
interface HeaderProps {
  className?: string;
}
function Header({ className }: HeaderProps) {
  const activeBoard = useActiveBoard();
  const heading = activeBoard?.name;
  return (
    <header
      className={`flex justify-center h-16 md:h-20 lg:h-24 bg-white dark:bg-black-400 border-b border-[#979797]/20 dark:text-white text-black ${className}`}
    >
      <div className="w-full h-full  pr-4 lg:h-24 flex justify-between">
        <div className="pl-4 md:pl-0 flex items-center gap-4">
          <LogoMobile className="w-6 h-6 md:hidden" />
          <div className="pl-4 min-h-full md:min-w-65 lg:min-w-75  md:pr-8 md:border-r md:border-grey-300 md:dark:border-black-300 items-center hidden md:flex ">
            <IconLogoDark className="w-38.25 h-6.25 dark:hidden" />
            <IconLogoLight className="w-38.25 h-6.25 hidden dark:block" />
          </div>
          <h1 className="hidden md:block heading-xl">{heading}</h1>
          <div className="heading-l md:heading-xl min-w-35.75 min-h-6.25 flex items-center md:hidden gap-2">
            {heading}
            <IconChevronDown className="w-3 h-3" />
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="px-4.5 py-2.5 md:px-6 md:py-3.75 bg-purple-500 rounded-3xl flex items-center justify-center enabled:hover:cursor-pointer hover:bg-purple-300 disabled:opacity-25 disabled:hover:bg-purple-500 disabled:hover:cursor-not-allowed"
            disabled={
              activeBoard === undefined || activeBoard.columns.length === 0
            }
          >
            <IconAddTaskMobile className="md:hidden w-3 h-3" />
            <span className="hidden md:block text-white heading-m">
              + Add New Task
            </span>
          </button>
          <button className="w-4 flex justify-end hover:cursor-pointer">
            <IconVerticalElipsis className="w-1 h-4 md:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
