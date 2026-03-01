"use client";
import { useSidebarStore } from "@/stores/sidebar";
import { ThemeProvider } from "next-themes";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ToggleSidebarButton from "./buttons/ToggleSidebarButton";
import { Board } from "@/types/data";

function MainContainer({
  children,
  initialBoards,
}: {
  children: React.ReactNode;
  initialBoards: Board[];
}) {
  const sidebarIsOpen = useSidebarStore((state) => state.SidebarIsOpen);
  return (
    <div
      className={`grid grid-cols-[1fr] grid-rows-[auto_1fr] ${sidebarIsOpen ? "md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr]" : "md:grid-cols-[1fr]"} md:grid-rows-[auto_1fr] h-screen`}
    >
      <ThemeProvider attribute={"class"} enableSystem>
        <Header className="col-span-2" initialBoards={initialBoards} />
        <Sidebar initialBoards={initialBoards} />
        <main className="w-full h-full flex gap-6 overflow-x-auto overflow-y-hidden bg-grey-200 dark:bg-black-600 p-6">
          <ToggleSidebarButton />
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
}
export default MainContainer;
