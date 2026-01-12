import { z } from "zod";

export const uploadSchema = z.object({
  file: z
    .any() // File objects are not strings, so we use z.any()
    .refine((file) => file instanceof File, { message: "File is required" }),
  title: z.string().min(1, "Title is required"),
  stream: z.string().min(1, "Stream is required"),
  description: z.string().optional(),
});
