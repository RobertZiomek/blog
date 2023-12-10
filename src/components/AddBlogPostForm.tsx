import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createBlogPostSchema,
  CreateBlogPostValues,
} from "../schemas/createBlogPostSchema";
import { BlogPostCategory, BlogPostStatus } from "../types/blogPost";

interface AddPostsPropsForm {
  onSubmit: (values: CreateBlogPostValues) => void;
  isLoading: boolean;
}

export const AddBlogPostForm = (props: AddPostsPropsForm) => {
  const blogPostCategories = Object.values(BlogPostCategory);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateBlogPostValues>({
    resolver: zodResolver(createBlogPostSchema),
  });

  const [categories, setCategories] = useState<BlogPostCategory[]>([]);
  const [status, setStatus] = useState<BlogPostStatus>(BlogPostStatus.DRAFT);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggledCategory = e.target.value as BlogPostCategory;
    const updatedCategories = categories.includes(toggledCategory)
      ? categories.filter((category) => category !== toggledCategory)
      : [...categories, toggledCategory];

    setCategories([...updatedCategories]);
  };

  return (
    // <form onSubmit={handleSubmit(d => console.log(d))}>

    // <form onSubmit={handleSubmit((d) => console.log("f"))}>
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title?.message && (
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Input
            type="text"
            id="content"
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content?.message && (
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>Categories</FormLabel>
          {blogPostCategories.map((category) => (
            <Checkbox
              key={category}
              value={category}
              isInvalid
              size="lg"
              colorScheme="green"
              isChecked={categories.includes(category)}
              onChange={handleCategoryChange}
            >
              {category}
            </Checkbox>
          ))}
          {errors.categories?.message && (
            <FormErrorMessage>{errors.categories?.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Checkbox
            value={"published"}
            size="lg"
            onChange={() => setStatus(BlogPostStatus.PUBLISHED)}
            colorScheme="green"
            isChecked={status === "published"}
          >
            {"published"}
          </Checkbox>
          <Checkbox
            value={"draft"}
            onChange={() => setStatus(BlogPostStatus.DRAFT)}
            size="lg"
            colorScheme="green"
            isChecked={status === "draft"}
          >
            {"draft"}
          </Checkbox>
          {errors.status?.message && (
            <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" isLoading={props.isLoading}>
          Create post
        </Button>
      </VStack>
    </form>
  );
};
