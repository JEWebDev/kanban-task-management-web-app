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
            dotColor={"#e2e2e2"}
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
    </>
  );
}

export default BoardLayout;
