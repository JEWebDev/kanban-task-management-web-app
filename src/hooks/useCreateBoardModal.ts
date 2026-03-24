import { BoardSchema } from "@/schemas/boardSchema";
import { useState } from "react";
import { useCreateBoard } from "./useBoards";

interface CreateBoardErrors {
  [key: string]: string;
}

export const useCreateBoardModal = () => {
  const { mutateAsync: createBoard } = useCreateBoard();
  const [errors, setErrors] = useState<CreateBoardErrors | undefined>(
    undefined,
  );
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(undefined);
    const formData = new FormData(e.currentTarget);
    const boardName = formData.get("boardName") as string;
    const columnNames =
      Array.from(formData.entries())
        .filter(
          ([key, value]) =>
            key.startsWith("columns") &&
            typeof value === "string" &&
            value.trim() !== "",
        )
        .map(([, value]) => value as string) ?? [];
    const result = BoardSchema.safeParse({
      boardName: boardName,
      columnNames: columnNames,
    });
    if (!result.success) {
      const newErrors: CreateBoardErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        newErrors[path] = issue.message;
        console.log(newErrors);
      });

      setErrors(newErrors);
      return;
    }
    try {
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

  return { errors, setErrors, handleSubmit };
};
