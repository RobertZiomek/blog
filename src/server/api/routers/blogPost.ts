import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { type BlogPost, blogPosts, users, persist } from "../storage";
import { getBlogPostsSchema } from "../../../schemas/getBlogPostsSchema";
import type { Page } from "../../../types/common";
import {
  BlogPostStatus,
  type DetailsBlogPost,
  type ListBlogPost,
} from "../../../types/blogPost";
import { delay } from "../../../utils/delay";
import { createBlogPostSchema } from "../../../schemas/createBlogPostSchema";
import { TRPCError } from "@trpc/server";
import { v4 } from "uuid";
import { editBlogPostSchema } from "../../../schemas/editBlogPostSchema";
import { getBlogPostSchema } from "../../../schemas/getBlogPostSchema";
import { deleteBlogPostSchema } from "../../../schemas/deleteBlogPostSchema";

type BlogPostFilter = (blogPost: BlogPost) => boolean;

export const blogPostRouter = createTRPCRouter({
  getBlogPosts: publicProcedure
    .input(getBlogPostsSchema)
    .query(async ({ input, ctx }): Promise<Page<ListBlogPost>> => {
      await delay(1000);

      const createStatusFilter = (): BlogPostFilter => {
        if (!ctx.userId) {
          return (blogPost) => blogPost.status === BlogPostStatus.PUBLISHED;
        }

        if (!input.status) {
          return (blogPost) =>
            blogPost.status === BlogPostStatus.PUBLISHED ||
            (blogPost.status === BlogPostStatus.DRAFT &&
              blogPost.author.id === ctx.userId);
        }

        if (input.status === BlogPostStatus.PUBLISHED) {
          return (blogPost) => blogPost.status === BlogPostStatus.PUBLISHED;
        }

        return (blogPost) =>
          blogPost.status === BlogPostStatus.DRAFT &&
          blogPost.author.id === ctx.userId;
      };

      const filters: BlogPostFilter[] = [createStatusFilter()];

      if (input.search) {
        const lowedCasedSearch = input.search.toLowerCase();
        filters.push((blogPost) =>
          blogPost.title.toLowerCase().includes(lowedCasedSearch)
        );
      }

      if (input.categories && input.categories.length > 0) {
        filters.push(
          (blogPost) =>
            !!input.categories?.some((category) =>
              blogPost.categories.includes(category)
            )
        );
      }

      const filteredBlogPosts =
        filters.length > 0
          ? blogPosts.filter((blogPost) =>
              filters.every((filter) => filter(blogPost))
            )
          : blogPosts;

      const pagedBlogPosts = filteredBlogPosts.slice(
        input.page * input.perPage,
        (input.page + 1) * input.perPage
      );

      return {
        data: pagedBlogPosts.map((blogPost) => ({
          author: {
            id: blogPost.author.id,
          },
          categories: blogPost.categories,
          id: blogPost.id,
          score: blogPost.score,
          title: blogPost.title,
        })),
        total: filteredBlogPosts.length,
      };
    }),
  getBlogPost: publicProcedure
    .input(getBlogPostSchema)
    .query(async ({ input, ctx }): Promise<DetailsBlogPost> => {
      await delay(1000);

      const user = users.find((user) => user.id === ctx.userId);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const blogPost = blogPosts.find((blogPost) => blogPost.id === input.id);
      if (!blogPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      if (
        blogPost.status === BlogPostStatus.DRAFT &&
        blogPost.author.id !== user.id
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Access denied",
        });
      }

      return {
        author: {
          id: blogPost.author.id,
        },
        categories: blogPost.categories,
        content: blogPost.content,
        id: blogPost.id,
        score: blogPost.score,
        title: blogPost.title,
      };
    }),
  createBlogPost: protectedProcedure
    .input(createBlogPostSchema)
    .mutation(async ({ ctx, input }) => {
      await delay(1000);

      const user = users.find((user) => user.id === ctx.userId);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      blogPosts.push({
        author: {
          id: user.id,
        },
        categories: input.categories,
        content: input.content,
        status: input.status,
        id: v4(),
        score: 0,
        title: input.title,
      });

      persist();
    }),
  editBlogPost: protectedProcedure
    .input(editBlogPostSchema)
    .mutation(async ({ ctx, input }) => {
      await delay(1000);

      const user = users.find((user) => user.id === ctx.userId);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const blogPost = blogPosts.find((blogPost) => blogPost.id === input.id);
      if (!blogPost) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      if (blogPost.author.id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Access denied",
        });
      }

      if (blogPost.status === BlogPostStatus.PUBLISHED) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Published blog post can not be edited",
        });
      }

      blogPost.categories = input.categories;
      blogPost.content = input.content;
      blogPost.title = input.title;
      blogPost.status = input.status;

      persist();
    }),
  deleteBlogPost: protectedProcedure
    .input(deleteBlogPostSchema)
    .mutation(async ({ ctx, input }) => {
      await delay(1000);

      const user = users.find((user) => user.id === ctx.userId);
      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const blogPostIndex = blogPosts.findIndex(
        (blogPost) => blogPost.id === input.id
      );
      if (blogPostIndex === -1) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog post not found",
        });
      }

      const blogPost = blogPosts[blogPostIndex]!;
      if (blogPost.author.id !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Access denied",
        });
      }

      blogPosts.splice(blogPostIndex, 1);

      persist();
    }),
});
