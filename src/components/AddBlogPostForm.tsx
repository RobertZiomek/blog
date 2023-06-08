import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

export const AddBlogPostForm = () => {
  return (
    <form>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input type="text" id="title" placeholder="title" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Input type="text" id="content" placeholder="content" />
        </FormControl>

        <Button type="submit">Create post</Button>
      </VStack>
    </form>
  );
};
