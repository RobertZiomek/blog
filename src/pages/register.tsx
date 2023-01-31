import { type NextPage } from "next";
import { api } from "../utils/api";
import { RegisterForm } from "../components/RegisterForm";
import type { RegisterValues } from "../schemas/registerSchema";
import { useToast } from "../hooks/useToast";
import { Layout } from "../components/Layout";

const RegisterPage: NextPage = () => {
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
      onSuccess: () => {
        toast({
          title: "Your account has been successfully created",
          status: "success",
        });
      },
    });
  };

  return (
    <Layout>
      <RegisterForm
        isLoading={registerMutation.isLoading}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default RegisterPage;
