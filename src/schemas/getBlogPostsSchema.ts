import { z } from "zod";
import { BlogPostCategory, BlogPostStatus } from "../types/blogPost";

export const getBlogPostsSchema = z.object({
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
  search: z
    .string({
      invalid_type_error: "Search must be a string",
    })
    .trim()
    .optional(),
  categories: z
    .array(
      z.nativeEnum(BlogPostCategory, {
        invalid_type_error: "Categories are invalid",
      })
    )
    .optional(),
  status: z
    .nativeEnum(BlogPostStatus, {
      invalid_type_error: "Status is invalid",
    })
    .optional(),
  authorId: z
    .string({
      invalid_type_error: "Author id must be an UUID",
    })
    .uuid("Author id must be an UUID")
    .optional(),
});

export type GetBlogPostsValues = z.infer<typeof getBlogPostsSchema>;
