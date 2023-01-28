import { type NextPage } from "next";
import { api } from "../utils/api";
import RegistrationForm, {
  RegistrationFormValues,
} from "../components/registrationForm";
import { useToast } from "@chakra-ui/react";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const registerMutation = api.user.register.useMutation();
  const toast = useToast();
  const handleSubmit = (values: RegistrationFormValues) => {
    const username = values.username;
    const password = values.password;
    registerMutation.mutate(
      { username, password },
      {
        onError: () => {
          toast({
            title: "error",
            description: "error",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
        onSuccess: () => {
          toast({
            title: "succes",
            description: "success",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };
  return (
    <>
      <RegistrationForm onSubmit={handleSubmit} />
    </>
  );
};

export default Home;
