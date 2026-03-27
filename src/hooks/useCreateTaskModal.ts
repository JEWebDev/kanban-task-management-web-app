import { useCreateTask } from "./useTasks"; // El hook que creamos antes
import { useFormErrorContext } from "@/context/FormErrorContext";
import { TaskSchema } from "@/schemas/taskSchema";
import { FormError } from "@/types/data";

export const useCreateTaskModal = (boardId: string) => {
  const { mutateAsync: createTask, isPending } = useCreateTask(boardId);
  const { errors, setErrors } = useFormErrorContext();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) return;
    setErrors(undefined);

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const columnId = formData.get("column_id") as string;

    const subtasks = Array.from(formData.entries())
      .filter(
        ([key, value]) =>
          key.startsWith("taskNames") &&
          typeof value === "string" &&
          value.trim() !== "",
      )
      .map(([, value]) => value as string);

    const result = TaskSchema.safeParse({
      title,
      description,
      columnId,
      subtasks,
    });

    if (!result.success) {
      const newErrors: FormError = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    try {
      await createTask({
        title,
        description,
        columnId,
        subtasks,
        priorityId: 1,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors({
          serverError: `Error: ${error.message}`,
        });
      }
    }
  };

  return { errors, setErrors, handleSubmit, isPending };
};
