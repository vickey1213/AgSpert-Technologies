
import React from "react";
import { Box, Button, Input, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = (data) => {
    login(data.username, data.password);
  };

  return (
    <Box>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <Input
          placeholder="Username"
          {...register("username", { required: true })}
        />
        <Input
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <Button type="submit">Login</Button>
      </VStack>
    </Box>
  );
}

export default LoginPage;
