import { BoardSchema } from "@/schemas/boardSchema";
import { useCreateBoard } from "./useBoards";
import { FormError } from "@/types/data";
import { useFormErrorContext } from "@/context/FormErrorContext";

export const useCreateBoardModal = () => {
  const { mutateAsync: createBoard, isPending } = useCreateBoard();
  const { errors, setErrors } = useFormErrorContext();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    setErrors(undefined);
    const formData = new FormData(e.currentTarget);
    const boardName = formData.get("boardName") as string;
    const columnNames =
      Array.from(formData.entries())
        .filter(
          ([key, value]) =>
            key.startsWith("columnNames") &&
            typeof value === "string" &&
            value.trim() !== "",
        )
        .map(([, value]) => value as string) ?? [];
    const result = BoardSchema.safeParse({
      boardName: boardName,
      columnNames: columnNames,
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
      setErrors(undefined);
      await createBoard({ boardName, columnNames });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "DUPLICATE_BOARD_NAME") {
          setErrors({ boardName: "Board already exists" });
        }
        if (error.message === "DUPLICATE_COLUMN_NAME_IN_BOARD") {
          setErrors({ columnName: "Column name can't be duplicated" });
        }
      } else {
        if (error instanceof Error)
          setErrors({
            serverError: `An unexpected error has occurred ${error.message}`,
          });
      }
    }
  };

  return { errors, setErrors, handleSubmit, isPending };
};
