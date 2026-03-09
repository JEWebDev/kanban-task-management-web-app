import z from "zod";

export const BoardSchema = z.object({
  boardName: z.string().min(1, "Can't be empty").trim(),
  columns: z.array(z.string().trim()).default([]),
});
