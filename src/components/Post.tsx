import { Skeleton, Text } from "@chakra-ui/react";
import { ListBlogPost } from "../types/blogPost";
import { PostCard } from "./PostCard";

interface PostCardProps {
  postsQuery: ListBlogPost[] | undefined;
  paginationPage: number;
  postsTotal: number | undefined;
  isLoading: boolean;
  error: any;
}

export const Posts = ({
  postsQuery,
  postsTotal,
  isLoading,
  error,
}: PostCardProps) => {
  if (isLoading)
    return (
      <>
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
        <Skeleton>wedwed</Skeleton>
        <br />
      </>
    );
  if (postsTotal === 0) return <Text>No blog posts</Text>;
  if (error) return <Text>Error </Text>;
  return (
    <div>
      {postsQuery?.map(({ author, categories, score, title, id }) => (
        <PostCard
          key={id}
          title={title}
          author={author.id}
          categories={categories}
          score={score}
        />
      ))}
    </div>
  );
};
