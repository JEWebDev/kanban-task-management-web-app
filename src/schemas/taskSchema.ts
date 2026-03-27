import z from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "Can't be empty"),
  description: z.string().optional(),
  columnId: z.string().min(1, "Please select a column"),
  subtasks: z.array(z.string()).optional().default([]), // Sin validación interna de contenido
});
