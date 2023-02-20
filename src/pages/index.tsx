import { Button, HStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const HomePage: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <HStack spacing={4}>
        <Button onClick={() => router.replace("/login")}>Login</Button>
        <Button onClick={() => router.replace("/register")}>Register</Button>
        <Button onClick={() => router.replace("/user/profile")}>
          User Profile
        </Button>
      </HStack>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
