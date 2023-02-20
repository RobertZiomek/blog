import { z } from "zod";
import { BlogPostCategory } from "../types/blogPost";

export const getBlogPostSchema = z.object({
  page: z
    .number({
      invalid_type_error: "Page must be a number",
      required_error: "Page is required",
    })
    .int("Page must be an int"),
  perPage: z
    .number({
      invalid_type_error: "Per page must be a number",
      required_error: "Per page is required",
    })
    .int("Per page must be an int"),
  search: z.string().trim().optional(),
  categories: z.array(z.nativeEnum(BlogPostCategory)).optional(),
});

export type GetBlogPostValues = z.infer<typeof getBlogPostSchema>;
