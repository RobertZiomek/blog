import { List, ListItem } from "@chakra-ui/react";
import { ListBlogPost } from "../types/blogPost";
import { PostCard } from "./PostCard";
import { PostListEmpty } from "./PostListEmpty";
import { PostListError } from "./PostListError";
import { PostListLoader } from "./PostListLoader";

interface PostListProps {
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
}: PostListProps) => {
  if (isLoading) return <PostListLoader blogPostPerPage={blogPostPerPage} />;

  if (isError) return <PostListError />;

  if (posts.length === 0) return <PostListEmpty />;

  return (
    <List>
      {posts.map(({ author, categories, score, title, id }) => (
        <ListItem key={id}>
          <PostCard
            title={title}
            author={author.id}
            categories={categories}
            score={score}
          />
        </ListItem>
      ))}
    </List>
  );
};
