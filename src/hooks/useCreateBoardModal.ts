import { BoardSchema } from "@/schemas/boardSchema";
import { useState } from "react";
import z from "zod";
import { useCreateBoard } from "./useBoards";

export const useCreateBoardModal = () => {
  const { mutateAsync: createBoard } = useCreateBoard();
  const [errors, setErrors] = useState<string[] | undefined>([]);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
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
      columns: columnNames,
    });
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors(tree?.properties?.boardName?.errors);
      return;
    }
    try {
      await createBoard({ boardName, columnNames });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrors([
          error.message === "DUPLICATE_BOARD_NAME"
            ? "Duplicated name"
            : error.message,
        ]);
      } else {
        setErrors(["An unknown error has occurred"]);
      }
    }
  };

  return { errors, setErrors, handleSubmit };
};
