import { type NextPage } from "next";
import React from "react";
import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { LoginValues } from "../schemas/loginSchema";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { AccessControl } from "../components/AccesControl";
import { Button } from "@chakra-ui/react";

const LoginPage: NextPage = ({}) => {
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();
  const loginMutation = api.user.login.useMutation();

  const handleSubmit = (values: LoginValues) => {
    loginMutation.mutate(values, {
      onError: (error) => {
        toast({
          title: error.message,
          status: "error",
        });
      },
      onSuccess: (data) => {
        login(data.accessToken, data.user.username);
        router.replace("/");

        toast({
          title: "You are successfully logged in",
          status: "success",
        });
      },
    });
  };
  return (
    <AccessControl isAuthorized={false}>
      <Layout>
        <LoginForm
          isLoading={loginMutation.isLoading}
          onSubmit={handleSubmit}
        />
        <Button onClick={() => router.replace("/")}>Back</Button>
      </Layout>
    </AccessControl>
  );
};

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});
