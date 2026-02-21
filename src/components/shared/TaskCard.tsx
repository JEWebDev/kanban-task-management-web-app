import { Subtask } from "@/types/data";

interface TaskCardProps {
  title: string;
  subtasks: Subtask[];
}
function TaskCard({ title, subtasks }: TaskCardProps) {
  const pending = subtasks.length;
  const completed = subtasks.filter((t) => t.isCompleted).length;
  return (
    <article className="w-full px-4 py-6 flex flex-col gap-2 drop-shadow-md dark:bg-black-400 bg-white rounded-lg">
      <h3 className="heading-m dark:text-white">{title}</h3>
      <p className="body-m dark:text-grey-400 font-bold">{`${completed} of ${pending} subtasks`}</p>
    </article>
  );
}

export default TaskCard;
