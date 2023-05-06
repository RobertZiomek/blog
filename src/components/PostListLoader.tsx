import { Skeleton, VStack } from "@chakra-ui/react";
import React from "react";

interface PostListLoaderProps {
  blogPostPerPage: number;
}

export const PostListLoader = ({ blogPostPerPage }: PostListLoaderProps) => {
  return (
    <VStack>
      {new Array(blogPostPerPage).fill("").map((name, index) => (
        <Skeleton key={index} width={480}>
          ...
        </Skeleton>
      ))}
    </VStack>
  );
};
