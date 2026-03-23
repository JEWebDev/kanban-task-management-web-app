import z from "zod";

export const BoardSchema = z.object({
  boardName: z.string().min(1, "Can't be empty").trim(),
  columnNames: z
    .array(z.string().trim())
    .default([])
    .superRefine((items, ctx) => {
      items.forEach((item, index) => {
        if (item.length === 0) return;
        if (items.indexOf(item) !== index) {
          ctx.addIssue({
            code: "custom",
            message: "Column name duplicated",
            path: [index],
          });
        }
      });
    }),
});
