import { Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { AddBlogPostForm } from "../components/AddBlogPostForm";
import { Layout } from "../components/Layout";
import { useToast } from "../hooks/useToast";
import { CreateBlogPostValues } from "../schemas/createBlogPostSchema";
import { api } from "../utils/api";

const AddPost = () => {
  const router = useRouter();
  const toast = useToast();
  const createBlogPostMutation = api.blogPost.createBlogPost.useMutation();

  const handleSubmit = (values: CreateBlogPostValues) => {
    console.log("a");
    createBlogPostMutation.mutate(values, {
      onError: (error) => {
        toast({
          title: error.message,
          status: "error",
        });
      },

      onSuccess: (data) => {
        console.log(data);
        toast({
          title: "Your post has been successfully created",
          status: "success",
        });
      },
    });
  };

  return (
    <Layout>
      <AddBlogPostForm
        isLoading={createBlogPostMutation.isLoading}
        onSubmit={handleSubmit}
      />
      <Button onClick={() => router.replace("/")}>Back</Button>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AddPost), {
  ssr: false,
});
