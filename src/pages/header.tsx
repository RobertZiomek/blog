import { Button, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";

const HeaderPage = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogut = () => {
    router.push("/");
    logout();
  };
  return (
    <Layout>
      <VStack spacing={4}>
        <Text>You are successfull login!</Text>
        <Button onClick={handleLogut}>Logout</Button>
      </VStack>
    </Layout>
  );
};
export default HeaderPage;
