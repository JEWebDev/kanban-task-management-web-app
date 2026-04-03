"use server";
import { Board } from "@/types/data";
import { createClient } from "../supabase/server";

export const getAllBoards = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("boards")
    .select("board_id, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data as Board[];
};

export const getBoardById = async (boardId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("boards")
    .select(
      `board_id, name,
        columns (column_id, name, tasks(*, subtasks(*)))`,
    )
    .eq("board_id", boardId)
    .single();

  if (error) throw error;
  return data as Board;
};

export const createBoard = async ({
  boardName,
  columnNames,
}: {
  boardName: string;
  columnNames: string[];
}) => {
  const supabase = await createClient();
  if (!boardName || boardName.trim() === "")
    throw new Error("Name is required");
  const { data, error } = await supabase.rpc("create_board", {
    board_name: boardName,
    column_names: columnNames,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateBoard = async ({
  boardId,
  boardName,
  columns,
}: {
  boardId: string;
  boardName: string;
  columns: { id: string; name: string }[];
}) => {
  const supabase = await createClient();

  if (!boardId) throw new Error("Board Id is required");
  if (!boardName || boardName.trim() === "")
    throw new Error("Name is required");

  const { error } = await supabase.rpc("update_board_with_columns", {
    p_board_id: boardId,
    p_board_name: boardName,
    p_columns: columns,
  });

  if (error) throw new Error(error.message);

  return { board_id: boardId, name: boardName } as Board;
};

export const deleteBoard = async (boardId: string) => {
  const supabase = await createClient();
  if (!boardId) return;
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("board_id", boardId);

  if (error) {
    console.log("Delete Error: ", error.message);
    throw new Error(error.message);
  }
};
