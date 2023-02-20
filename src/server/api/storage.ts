import fs from "fs";
import { z } from "zod";
import { BlogPostCategory } from "../../types/blogPost";

enum Collection {
  USERS = "users",
  BLOG_POSTS = "blog-posts",
}

const saveCollection = <T>(name: Collection, data: T[]) => {
  fs.writeFileSync(`./storage/${name}.json`, JSON.stringify(data), "utf-8");
};

const loadCollection = <T extends z.ZodTypeAny>(
  name: Collection,
  schema: T
): z.infer<T>[] => {
  let raw = "";
  try {
    raw = fs.readFileSync(`./storage/${name}.json`, "utf8");
  } catch (e) {
    fs.writeFileSync(`./storage/${name}.json`, JSON.stringify([]), "utf-8");
  }

  const json: unknown = JSON.parse(raw);
  const arraySchema = z.array(schema);

  return arraySchema.parse(json);
};

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const blogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  categories: z.array(z.nativeEnum(BlogPostCategory)),
  score: z.number(),
  author: z.object({
    id: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;

export type BlogPost = z.infer<typeof blogPostSchema>;

export const users = loadCollection(Collection.USERS, userSchema);

export const blogPosts = loadCollection(Collection.BLOG_POSTS, blogPostSchema);

export const persist = () => {
  saveCollection(Collection.USERS, users);
  saveCollection(Collection.BLOG_POSTS, blogPosts);
};
