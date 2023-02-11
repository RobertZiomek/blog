import React from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "../schemas/loginSchema";

export interface LoginFormProps {
  onSubmit: (values: LoginValues) => void;
  isLoading: boolean;
}

export function LoginForm(props: LoginFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.username?.message}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username?.message && (
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.password?.message}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message && (
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button type="submit" isLoading={props.isLoading}>
          Log in
        </Button>
      </VStack>
    </form>
  );
}
