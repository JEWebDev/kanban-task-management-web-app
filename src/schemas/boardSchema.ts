import z from "zod";

export const BoardSchema = z.object({
  boardName: z.string().min(1, "Can't be empty").trim(),
  columnNames: z
    .array(z.string().trim())
    .default([])
    .superRefine((items, ctx) => {
      const seen = new Set();
      items.forEach((item, index) => {
        if (item.length === 0) return;
        if (seen.has(item)) {
          ctx.addIssue({
            code: "custom",
            message: "Column name duplicated",
            path: [index],
          });
        }
        seen.add(item);
      });
    }),
});
