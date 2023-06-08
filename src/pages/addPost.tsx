import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { AddBlogPostForm } from "../components/AddBlogPostForm";
import { Layout } from "../components/Layout";

const AddPost = () => {
  const router = useRouter();

  return (
    <Layout>
      <AddBlogPostForm />
      <Button onClick={() => router.replace("/")}>Back</Button>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(AddPost), {
  ssr: false,
});
