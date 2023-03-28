import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BlogPostCategory } from "../types/blogPost";

export interface PostFormProps {
  title: string;
  score: number;
  categories: BlogPostCategory[];
  author: string;
}

export function PostCard({ categories, score, title }: PostFormProps) {
  return (
    <Card bg={"gray.300"} mb={5} mt={5}>
      <CardHeader>
        <Box display={"flex"} justifyContent={"space-between"}>
          {" "}
          <Heading size="md">Author</Heading>
          <Text size="md">{score}</Text>
        </Box>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Text size="xs">{title}</Text>
          </Box>
        </Stack>
        <Text fontSize={12}>Category: {categories.join(", ")}</Text>
      </CardBody>
    </Card>
  );
}
