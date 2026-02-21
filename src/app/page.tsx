"use client";
import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";
import { useKanbanStore } from "@/stores/boards";
import Column from "@/components/shared/Column";
import TaskCard from "@/components/shared/TaskCard";

export default function Home() {
  const boards = useKanbanStore((state) => state.boards);
  const activeBoardId = useKanbanStore((state) => state.activeBoardId);
  const activeBoard = boards.find((board) => board.id === activeBoardId);

  return (
    <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] md:grid-rows-[auto_1fr] h-screen">
      <Header className="col-span-2" />
      <Sidebar />
      <main className="w-full h-full flex gap-6 overflow-x-auto overflow-y-hidden bg-light-grey dark:bg-very-dark-grey p-6">
        {activeBoard?.columns.map((column) => {
          return (
            <Column
              key={column.id}
              title={column.name}
              dotColor={"#49C4E5"}
              taskCount={column.tasks.length}
            >
              {column.tasks.map((task) => {
                return (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    subtasks={task.subtasks}
                  />
                );
              })}
            </Column>
          );
        })}
      </main>
    </div>
  );
}
