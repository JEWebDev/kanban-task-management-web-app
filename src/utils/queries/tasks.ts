"use server";
import { createClient } from "../supabase/server";

export const createTask = async ({
  title,
  description,
  columnId,
  subtasks = [],
  priorityId = 1,
}: {
  title: string;
  description: string;
  columnId: string;
  subtasks?: string[];
  priorityId?: number;
}) => {
  const supabase = await createClient();

  if (!title || title.trim() === "") throw new Error("Title is required");

  if (!columnId) throw new Error("Column ID is required");

  const { data, error } = await supabase.rpc("create_task_with_subtasks", {
    p_title: title,
    p_description: description,
    p_column_id: columnId,
    p_subtasks: subtasks,
    p_priority_id: priorityId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
