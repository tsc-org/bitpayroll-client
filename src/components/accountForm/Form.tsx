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
} from "@chakra-ui/react";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export interface AuthFormProps {
    state: Data;
    setState: React.Dispatch<React.SetStateAction<Data>>;
  submitHandler: (x: Data) => void;
  loading: boolean;
  error: {};
  pageSwitch?: boolean;
  inputOptions: inputOption[];
  text: {
    heading?: string;
    subHeading?: string;
    loading: string;
    action: string;
  };
  signUp?: boolean;
  forgotPassCheck?: boolean;
}

export interface Data {
  [key: string]: string | number;
}

export interface inputOption {
  name: string;
  placeholder: string;
  type: string;
  isRequired: boolean;
  hasVisibilityToggle: boolean;
}

interface PasswordVisibility {
  [key: string]: boolean;
}

const Form: FunctionComponent<AuthFormProps> = ({
    state, setState,
  submitHandler,
  loading,
  error,
  pageSwitch,
  inputOptions,
  text,
  signUp,
  forgotPassCheck,
}) => {
//   const [data, setData] = useState<Data>(initialState || {});

  const [pageSwitchValue, setPageSwitchValue] = useState(0);

  const [passwordVisibility, setPasswordVisibility] =
    useState<PasswordVisibility>({});

  const auth = useAuth();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitHandler(state);
  };

  const togglePasswordVisibility = (name: string) => {
    setPasswordVisibility((prev) => ({ ...prev, [name]: !prev[name] ?? true}));
  };

  if (auth.auth) <Navigate to="/dashboard" />;

  const renderPage = useMemo(() => {
    if (!pageSwitch || pageSwitchValue) {
      return (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} mt="56px" mb="100px">
            {inputOptions.map((inputOption: inputOption, idx) => {
              if ((inputOption.type !== "password")) {
                return (
                  <Input
                    key={idx}
                    name={inputOption.name}
                    placeholder={inputOption.placeholder}
                    value={state[inputOption.name]}
                    onChange={handleChange}
                    size="lg"
                    border="0.5px solid"
                    borderColor="grey.100"
                    fontSize="sm"
                    required={inputOption.isRequired}
                  />
                );
              } else if ((inputOption.type = "password")) {
                return (
                  <InputGroup key={idx} size="lg">
                    <Input
                      fontSize="sm"
                      name={inputOption.name}
                      placeholder={inputOption.placeholder}
                      type={passwordVisibility[inputOption.name] ? "text" : "password"}
                      value={state[inputOption.name]}
                      onChange={handleChange}
                      border="0.5px solid"
                      borderColor="grey.100"
                      required
                    />
                    {inputOption.hasVisibilityToggle && (
                      <InputRightElement
                        children={
                          <IconButton
                            aria-label="show/hide password"
                            icon={passwordVisibility[inputOption.name] ? <FiEyeOff /> : <FiEye />}
                            size="sm"
                            fontSize="20px"
                            height={"30px"}
                            variant={"flat"}
                            color="grey.300"
                            onClick={() => togglePasswordVisibility(inputOption.name)}
                          />
                        }
                      />
                    )}
                  </InputGroup>
                );
              }
            })}
            {forgotPassCheck && (
              <Text textAlign="right" fontWeight="400">
                <Link to="/reset-password">Forgot password?</Link>
              </Text>
            )}
          </Stack>
          <Button
            isLoading={loading}
            loadingText={text.loading}
            size="full"
            fontSize="sm"
            type="submit"
          >
            {text.action && text.action}
          </Button>
        </form>
      );
    } else {
      return (
        <form>
          <Text>How would you like to sign up?</Text>
        </form>
      );
    }
  }, []);

  return (
    <Center w="full" h="100vh">
      <Container maxW="438px" textAlign="center" p={12} fontSize="sm">
        <Heading fontWeight="500" fontSize="2xl" color="grey.375">
          {text.heading}
        </Heading>
        <Text fontWeight="500" color="grey.200" mt="4">
          {text.subHeading}
        </Text>
        {renderPage}
        <Box textAlign="center" mt="6">
          {signUp ? "Don't" : "Already"} have an account?
          <Text ml="2" display={"inline"} color={"orange.200"}>
            <Link to={signUp ? "/sign-up" : "/login"}>
              {signUp ? "Sign in" : "Create account"}
            </Link>
          </Text>
        </Box>
      </Container>
    </Center>
  );
};

export default Form;
