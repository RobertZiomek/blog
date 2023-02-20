import { type NextPage } from "next";
import { api } from "../utils/api";
import { RegisterForm } from "../components/RegisterForm";
import type { RegisterValues } from "../schemas/registerSchema";
import { useToast } from "../hooks/useToast";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { AccessControl } from "../components/AccesControl";
import { Button } from "@chakra-ui/react";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const toast = useToast();
  const registerMutation = api.user.register.useMutation();

  const handleSubmit = (values: RegisterValues) => {
    registerMutation.mutate(values, {
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
          title: "Your account has been successfully created",
          status: "success",
        });
      },
    });
  };
  return (
    <AccessControl isAuthorized={false}>
      <Layout>
        <RegisterForm
          isLoading={registerMutation.isLoading}
          onSubmit={handleSubmit}
        />
        <Button onClick={() => router.replace("/")}>Back</Button>
      </Layout>
    </AccessControl>
  );
};

export default dynamic(() => Promise.resolve(RegisterPage), {
  ssr: false,
});
