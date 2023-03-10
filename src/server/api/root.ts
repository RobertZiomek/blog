import { createTRPCRouter } from "./trpc";
import { userRouter } from "./routers/user";
import { blogPostRouter } from "./routers/blogPost";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  blogPost: blogPostRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
