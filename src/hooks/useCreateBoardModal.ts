import { BoardSchema } from "@/schemas/boardSchema";
import { useCreateBoard, useUpdateBoard } from "./useBoards";
import { FormError } from "@/types/data";
import { useFormErrorContext } from "@/context/FormErrorContext";
import { useState } from "react";

interface UseCreateBoardModalOptions {
  boardId?: string;
  isEditing?: boolean;
  originalBoardName?: string;
  originalColumns?: { id: string; name: string }[];
}

export const useCreateBoardModal = ({
  boardId,
  isEditing = false,
  originalBoardName = "",
  originalColumns = [],
}: UseCreateBoardModalOptions = {}) => {
  const { mutateAsync: createBoard, isPending: isMutationPending } =
    useCreateBoard();
  const { mutateAsync: updateBoard, isPending: isUpdatePending } =
    useUpdateBoard();
  const { errors, setErrors } = useFormErrorContext();

  const [isNavigating, setIsNavigating] = useState(false);
  const isPending = isMutationPending || isUpdatePending || isNavigating;

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
            !key.startsWith("columnNamesId") &&
            typeof value === "string" &&
            value.trim() !== "",
        )
        .map(([, value]) => value as string) ?? [];
    const columnIds =
      Array.from(formData.entries())
        .filter(
          ([key, value]) =>
            key.startsWith("columnNamesId") && typeof value === "string",
        )
        .map(([, value]) => value as string) ?? [];

    const columns = columnNames.map((name, index) => ({
      id: columnIds[index] || `new-${index}`,
      name,
    }));

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

    // Custom validation: prevent submit if no changes (edit mode only)
    if (isEditing) {
      const origName = (originalBoardName || "").trim();
      const newName = (boardName || "").trim();
      const origCols = (originalColumns || []).map((c) => c.name.trim());
      const newCols = columnNames.map((c) => c.trim());
      const unchangedName = origName === newName;
      const unchangedCols =
        origCols.length === newCols.length &&
        origCols.every((c, i) => c === newCols[i]);
      if (unchangedName && unchangedCols) {
        setErrors({ serverError: "No changes to save." });
        return;
      }
    }
    try {
      setErrors(undefined);

      if (isEditing && boardId) {
        await updateBoard({ boardId, boardName, columns });
      } else {
        await createBoard({ boardName, columnNames });
      }

      setIsNavigating(true);
    } catch (error: unknown) {
      setIsNavigating(false);
      if (error instanceof Error) {
        if (error.message === "DUPLICATE_BOARD_NAME") {
          setErrors({ boardName: "Board already exists" });
        }
        if (error.message === "DUPLICATE_COLUMN_NAME_IN_BOARD") {
          setErrors({ "columnNames.0": "Column name can't be duplicated" });
        }
        if (
          error.message !== "DUPLICATE_BOARD_NAME" &&
          error.message !== "DUPLICATE_COLUMN_NAME_IN_BOARD"
        ) {
          setErrors({
            serverError: `An unexpected error has occurred ${error.message}`,
          });
        }
      }
    }
  };

  return { errors, setErrors, handleSubmit, isPending };
};
