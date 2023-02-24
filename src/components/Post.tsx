import { api } from "../utils/api";
import { PostForm } from "./PostForm";

export const Posts = () => {
  const posts = api.blogPost.getBlogPosts.useQuery({ page: 0, perPage: 10 });
  const postss = posts.data?.data;
  const postsss = postss?.map((post) => ({
    title: post.title,
    score: post.score,
    categories: post.categories,
    author: post.author.id,
    id: post.id,
  }));
  return (
    <div>
      {postsss &&
        postsss.map(({ author, categories, id, score, title }) => (
          <PostForm
            key={id}
            title={title}
            author={author}
            categories={categories}
            score={score}
          />
        ))}
    </div>
  );
};
