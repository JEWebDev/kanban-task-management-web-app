"use client";
import Column from "@/components/shared/Column";
import TaskCard from "@/components/shared/TaskCard";
import useActiveBoard from "@/hooks/useActiveBoard";

function BoardLayout() {
  const board = useActiveBoard();
  return (
    <>
      {board?.columns.map((column) => {
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
      {board && board?.columns?.length > 0 && (
        <button className="min-w-70 items-center justify-center heading-xl text-grey-400 rounded-md dark:bg-linear-to-b  dark:from-[#2B2C37]/25 dark:to-[#2B2C37]/50 bg-linear-to-b from-[#e9effa] to-[#e9effa]/50 hidden md:flex hover:text-purple-500 hover:cursor-pointer">
          <span className="">+ New Column</span>
        </button>
      )}
    </>
  );
}

export default BoardLayout;
