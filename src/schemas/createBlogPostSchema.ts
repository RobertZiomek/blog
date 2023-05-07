import { z } from "zod";
import { BlogPostCategory, BlogPostStatus } from "../types/blogPost";

export const createBlogPostSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string",
      required_error: "Title is required",
    })
    .trim()
    .min(3, "Title must have at least 3 characters")
    .max(255, "Title can't have more than 255 characters"),
  content: z
    .string({
      invalid_type_error: "Content must be a string",
      required_error: "Content is required",
    })
    .trim()
    .min(3, "Content must have at least 3 characters")
    .max(2048, "Content can't have more than 2048 characters"),
  categories: z.array(z.nativeEnum(BlogPostCategory), {
    invalid_type_error: "Categories are invalid",
    required_error: "Categories are required",
  }),
  status: z.nativeEnum(BlogPostStatus, {
    invalid_type_error: "Status is invalid",
    required_error: "Status is required",
  }),
});

export type CreateBlogPostValues = z.infer<typeof createBlogPostSchema>;
