import { createTRPCRouter, publicProcedure } from "../trpc";
import { type BlogPost, blogPosts } from "../storage";
import { getBlogPostSchema } from "../../../schemas/getBlogPostsSchema";
import type { Page } from "../../../types/common";
import type { ListBlogPost } from "../../../types/blogPost";
import { delay } from "../../../utils/delay";

type BlogPostFilter = (blogPost: BlogPost) => boolean;

export const blogPostRouter = createTRPCRouter({
  getBlogPosts: publicProcedure
    .input(getBlogPostSchema)
    .query(async ({ input }): Promise<Page<ListBlogPost>> => {
      await delay(1000);

      const filters: BlogPostFilter[] = [];

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
        total: blogPosts.length,
      };
    }),
});
