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
