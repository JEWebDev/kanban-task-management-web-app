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
        <div className="min-w-70 items-center justify-center rounded-md bg-linear-to-b from-0% from-[#2B2C37]/25 to-100% to-[#2B2C37]/50 hidden md:flex">
          <p className="heading-xl dark:text-grey-400">+ New Column</p>
        </div>
      )}
    </>
  );
}

export default BoardLayout;
