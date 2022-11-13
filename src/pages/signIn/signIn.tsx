import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import Form, { Data, inputOption } from "../../components/accountForm/Form";
import useAuth from "../../hooks/useAuth";

import { FiEyeOff, FiEye } from "react-icons/fi";

const text = {
  heading: "Welcome back",
  subHeading: "Enter your details to continue",
  action: "Sign in",
  loading: "Logging in",
};

const SignIn = () => {
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { auth, onLogin, clearAuth } = useAuth();
  const toast = useToast()

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAuth()
    if (!data.email || !data.password) return;
    setLoading(true);
    axios
      .post(endpoints.LOGIN(), data)
      .then((res) => {
        console.log(res);
        const auth = {
          auth: res.data?.auth || false,
          jwt: res.data?.jwt || null,
        };
        onLogin(auth)
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        const errMessage = err?.response?.data?.message || "Please try again later"
        toast({
          title: 'Unable to sign in',
          description: errMessage,
          status: 'error',
          duration: 6000,
          isClosable: true,
        })
      })
      .finally(() => setLoading(false));
  };

  if (auth?.auth?.auth) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Center w="full" h="100vh">
      <Container maxW="438px" textAlign="center" p={12} fontSize="sm" border="0.5px solid" borderColor="grey.100" borderRadius="10px">
        <Heading fontWeight="500" fontSize="2xl" color="grey.375">
          Welcome back
        </Heading>
        <Text fontWeight="500" color="grey.200" mt="4">
          Enter your details to continue
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} mt="56px" mb="100px">
            <Input
              name="email"
              placeholder="Enter organization email"
              value={data.email}
              onChange={handleChange}
              size="lg"
              border="0.5px solid"
              borderColor="grey.100"
              fontSize="sm"
              required
            />
            <InputGroup size="lg">
              <Input
                fontSize="sm"
                name="password"
                placeholder="Enter password"
                type={
                  passwordVisibility ? "text" : "password"
                }
                value={data.password}
                onChange={handleChange}
                border="0.5px solid"
                borderColor="grey.100"
                required
              />
                <InputRightElement
                  children={
                    <IconButton
                      aria-label="show/hide password"
                      icon={
                        passwordVisibility ? <FiEye /> : <FiEyeOff />
                      }
                      fontSize="20px"
                      variant={"flat"}
                      color="grey.200"
                      onClick={togglePasswordVisibility}
                    />
                  }
                />
            </InputGroup>
            <Text textAlign="right" fontWeight="400">
              <Link to="/reset-password">Forgot password?</Link>
            </Text>
          </Stack>
          <Button
            isLoading={loading}
            loadingText="Loading"
            size="full"
            fontSize="sm"
            type="submit"
          >
            Sign in
          </Button>
        </form>
        <Box textAlign="center" mt="6">
          Don't have an account?
          <Text ml="2" display={"inline"} color={"orange.200"}>
            <Link to="/sign-up">Create account</Link>
          </Text>
        </Box>
      </Container>
    </Center>
  );
};

export default SignIn;
