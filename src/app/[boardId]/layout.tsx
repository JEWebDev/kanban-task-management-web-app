"use client";
import Column from "@/components/shared/Column";
import TaskCard from "@/components/shared/TaskCard";
import { useBoard } from "@/hooks/useBoards";
import { useParams } from "next/navigation";

function BoardLayout() {
  const { boardId } = useParams();
  const { data: board } = useBoard(boardId as string);
  return (
    <>
      {board?.columns?.map((column) => {
        return (
          <Column
            key={column.column_id}
            title={column.name}
            dotColor={"#49C4E5"}
            taskCount={column.tasks.length}
          >
            {column.tasks.map((task) => {
              return (
                <TaskCard
                  key={task.task_id}
                  title={task.title}
                  subtasks={task.subtasks}
                />
              );
            })}
          </Column>
        );
      })}
      {board?.columns && board?.columns?.length > 0 && (
        <button className="min-w-70 items-center justify-center heading-xl text-grey-400 rounded-md dark:bg-linear-to-b  dark:from-[#2B2C37]/25 dark:to-[#2B2C37]/50 bg-linear-to-b from-[#e9effa] to-[#e9effa]/50 hidden md:flex hover:text-purple-500 hover:cursor-pointer">
          <span className="">+ New Column</span>
        </button>
      )}

      {board?.columns && board?.columns.length <= 0 && (
        <div className="h-full w-full flex flex-col items-center justify-center text-center gap-6">
          <p className="heading-l text-grey-400">
            This board is empty. Create a new column to get started.
          </p>
          <button className="px-4.5 py-2.5 md:px-6 md:py-3.75 bg-purple-500 rounded-3xl flex items-center justify-center enabled:hover:cursor-pointer hover:bg-purple-300 disabled:opacity-25 disabled:hover:bg-purple-500 disabled:hover:cursor-not-allowed">
            <span className="text-white heading-m">+ Add New Column</span>
          </button>
        </div>
      )}
    </>
  );
}

export default BoardLayout;
