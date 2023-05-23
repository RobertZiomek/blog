import { z } from "zod";

export const deleteBlogPostSchema = z.object({
  id: z
    .string({
      invalid_type_error: "Id must be an UUID",
      required_error: "Id is required",
    })
    .uuid("Id must be an UUID"),
});

export type DeleteBlogPostSchema = z.infer<typeof deleteBlogPostSchema>;
