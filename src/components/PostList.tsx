import { List } from "@chakra-ui/react";
import { ListBlogPost } from "../types/blogPost";
import { PostCard } from "./PostCard";
import { PostListEmpty } from "./PostListEmpty";
import { PostListError } from "./PostListError";
import { PostListLoader } from "./PostListLoader";

interface PostCardProps {
  posts: ListBlogPost[];
  isLoading: boolean;
  isError: boolean;
  blogPostPerPage: number;
}

export const PostList = ({
  posts,
  isLoading,
  isError,
  blogPostPerPage,
}: PostCardProps) => {
  if (isLoading) return <PostListLoader blogPostPerPage={blogPostPerPage} />;

  if (posts.length === 0) return <PostListEmpty />;

  if (isError) return <PostListError />;

  return (
    <List>
      {posts.map(({ author, categories, score, title, id }) => (
        <PostCard
          key={id}
          title={title}
          author={author.id}
          categories={categories}
          score={score}
        />
      ))}
    </List>
  );
};
