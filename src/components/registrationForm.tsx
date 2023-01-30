import React from "react";
import { Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../server/api/routers/user";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormValues) => void;
}

export interface RegistrationFormValues {
  username: string;
  password: string;
}
const registerSchemaValidation = registerSchema;

function RegistrationForm(props: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchemaValidation),
  });

  return (
    <form
      onSubmit={handleSubmit(() => {
        const username = watch("username");
        const password = watch("password");
        props.onSubmit({ username, password });
      })}
    >
      <Input
        maxW="400px"
        type="text"
        id=""
        placeholder="Username"
        {...register("username")}
      />
      {errors.username?.message && <p>error</p>}
      <Input
        maxW="400px"
        type="password"
        id=""
        placeholder="Password"
        {...register("password")}
      />
      {errors.password?.message && <p>error</p>}
      <Button type="submit">Create account</Button>
    </form>
  );
}

export default RegistrationForm;
