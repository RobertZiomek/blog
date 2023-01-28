import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, FormControl } from "@chakra-ui/react";

interface RegistrationFormProps {
  onSubmit: (values: RegistrationFormValues) => void;
}

export interface RegistrationFormValues {
  username: string;
  password: string;
}

function RegistrationForm(props: RegistrationFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleUsernameValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Input
          maxW="400px"
          type="text"
          id=""
          placeholder="Username"
          value={username}
          onChange={handleUsernameValue}
        />
        <Input
          maxW="400px"
          type="password"
          id=""
          placeholder="Password"
          value={password}
          onChange={handlePasswordValue}
        />
        <Button type="submit">Create account</Button>
      </FormControl>
    </form>
  );
}

export default RegistrationForm;
