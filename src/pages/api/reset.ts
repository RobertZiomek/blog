import argon2 from "argon2";
import { v4 } from "uuid";
import type { NextApiRequest, NextApiResponse } from "next";
import { blogPosts, users, persist, type User } from "../../server/api/storage";
import { faker } from "@faker-js/faker";
import * as R from "remeda";
import { BlogPostCategory } from "../../types/blogPost";

const FAKE_BLOG_POST_COUNT = 40;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const categories = R.values(BlogPostCategory);
  const user: User = {
    id: v4(),
    password: await argon2.hash("password"),
    username: "username",
  };

  users.push(user);

  blogPosts.splice(0, blogPosts.length);
  new Array(FAKE_BLOG_POST_COUNT).fill(null).forEach(() => {
    blogPosts.push({
      author: {
        id: user.id,
      },
      categories: R.pipe(
        R.range(
          0,
          faker.datatype.number({ min: 1, max: categories.length - 1 })
        ),
        R.map((i) => categories[i] as BlogPostCategory),
        R.uniq()
      ),
      id: v4(),
      score: faker.datatype.number({ min: -20, max: 20 }),
      title: faker.lorem.text(),
    });
  });

  persist();

  res.status(200).json({ ok: true });
}
