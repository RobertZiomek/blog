import { type NextPage } from "next";
import React from "react";
import { Layout } from "../components/Layout";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { AuthProvider } from "../providers/AuthProvider";
import { LoginValues } from "../schemas/loginSchema";
import { api } from "../utils/api";
import Router from "next/router";

const LoginPage: NextPage = ({}) => {
  const authData = useAuth();
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
        authData.login(data.accessToken, data.user.username);
        Router.push({ pathname: "/header" });

        toast({
          title: "You are successfully logged in",
          status: "success",
        });
      },
    });
  };
  return (
    <Layout>
      <LoginForm isLoading={loginMutation.isLoading} onSubmit={handleSubmit} />
    </Layout>
  );
};

export default LoginPage;
