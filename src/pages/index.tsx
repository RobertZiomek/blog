
import { Button, HStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const router = useRouter();
  return (
    <Layout>
      <HStack spacing={4}>
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/register")}>Register</Button>
      </HStack>
    </Layout>
  );
};

export default HomePage;
