import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import { Data } from "../../components/accountForm/Form";
import useAuth from "../../hooks/useAuth";
import { FiEyeOff, FiEye } from "react-icons/fi";
import styles from "./signUp.module.scss";

export enum AccountType {
  ORG = "ORGANISATION",
  EMP = "EMPLOYEE",
}

interface PasswordVisType {
  [key: string]: boolean;
}

const SignUp = () => {
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    confirmPassword: "",
    page: 0,
  });
  const [accountType, setAccountType] = useState<AccountType>(AccountType.ORG);
  const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisType>(
    {
      password: false,
      confirmPassword: false,
    }
  );
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { onLogin, clearAuth } = useAuth();
  const toast = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    let name = e.target.name;
    let value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (name: string) => {
    let newValue = !passwordVisibility[name] ?? true;
    setPasswordVisibility((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearAuth();
    if (validateConfirmPassword()) return;

    const query =
      accountType === AccountType.EMP
        ? endpoints.REGISTER_EMPLOYEE()
        : endpoints.REGISTER_ORG();
    const body = {
      email: data.email,
      password: data.password,
    };
    setLoading(true);
    axios
      .post(query, body)
      .then((res) => {
        const auth = {
          auth: false,
          jwt: res.data.jwt,
        };
        onLogin(auth);
        navigate("/verification");
        // const headers = {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${res.data.jwt}`
        //   }
        // axios.get(endpoints.REQUEST_VERIFICATION(), {headers})
        //   .then(res => {
        //     console.log('after verification', res)
        //   })
        //   .catch(err => console.log(err))
        // storageService.setData(res.data)
      })
      .catch((err) => {
        const errMessage =
          err?.response?.data?.message || "Please try again later";
        toast({
          title: "Unable to sign up",
          description: errMessage,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleAccountType = (value: AccountType) => {
    // move to next page
    setData((prev) => ({ ...prev, page: 1 }));
    setAccountType(value);
  };

  const switchPage = (value: number) => {
    setData((prev) => ({ ...prev, page: value }));
  };

  // validation
  function validateConfirmPassword(): boolean | undefined {
    return data.confirmPassword !== data.password;
  }

  return (
    <>
      <Container
        maxW="438px"
        textAlign="center"
        mt="10vh"
        p={12}
        fontSize="sm"
        border="0.5px solid"
        borderColor="grey.100"
        borderRadius="10px"
      >
        <Heading fontWeight="500" fontSize="2xl">
          Create an account
        </Heading>
        <Text fontWeight="500" color="grey.200" mt="4">
          Lets get you started
        </Text>
        <Center position="relative" pt={6}>
          <Box position="absolute" w="100%" h="1px" bgColor="grey.100"></Box>
          <HStack spacing={8}>
            <Button
              onClick={() => switchPage(0)}
              size="no-size"
              variant={
                !data.page ? "page-switch-active" : "page-switch-inactive"
              }
            >
              1
            </Button>
            <Button
              onClick={() => switchPage(1)}
              size="no-size"
              variant={
                data.page ? "page-switch-active" : "page-switch-inactive"
              }
            >
              2
            </Button>
          </HStack>
        </Center>
        <Box mt={14} className={styles.page_container}>
          <div
            className={`${styles.extended_section} ${
              data.page
                ? styles.extended_section_two
                : styles.extended_section_one
            }`}
          >
            <div className={styles.page_one}>
              <Text textAlign="left" fontWeight="500" mb={8}>
                How would you like to sign up?
              </Text>
              <RadioGroup
                mb={"100px"}
                onChange={handleAccountType}
                value={accountType}
              >
                <Stack spacing={7}>
                  <Radio size="sm" value={AccountType.ORG}>
                    As an organization
                  </Radio>
                  <Radio size="sm" value={AccountType.EMP}>
                    As an employee
                  </Radio>
                </Stack>
              </RadioGroup>
              <Button
                display={data.page ? "none" : "block"}
                size="full"
                fontSize="sm"
                onClick={() => setData((prev) => ({ ...prev, page: 1 }))}
              >
                Next
              </Button>
            </div>
            <div className={styles.page_two}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={6} mb="100px">
                  <Input
                    name="email"
                    placeholder={`Enter ${accountType} email`}
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
                      type={passwordVisibility.password ? "text" : "password"}
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
                            passwordVisibility.password ? (
                              <FiEye />
                            ) : (
                              <FiEyeOff />
                            )
                          }
                          fontSize="20px"
                          variant={"flat"}
                          color="grey.200"
                          onClick={() => togglePasswordVisibility("password")}
                        />
                      }
                    />
                  </InputGroup>
                  <FormControl isInvalid={validateConfirmPassword()}>
                    <InputGroup size="lg">
                      <Input
                        fontSize="sm"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        type={
                          passwordVisibility.confirmPassword
                            ? "text"
                            : "password"
                        }
                        value={data.confirmPassword}
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
                              passwordVisibility.confirmPassword ? (
                                <FiEye />
                              ) : (
                                <FiEyeOff />
                              )
                            }
                            fontSize="20px"
                            variant={"flat"}
                            color="grey.200"
                            onClick={() =>
                              togglePasswordVisibility("confirmPassword")
                            }
                          />
                        }
                      />
                    </InputGroup>
                    {validateConfirmPassword() && (
                      <FormErrorMessage>Passwords don't match</FormErrorMessage>
                    )}
                  </FormControl>
                </Stack>
                <Button
                  display={!data.page ? "none" : "flex"}
                  isLoading={loading}
                  loadingText="Creating"
                  size="full"
                  fontSize="sm"
                  type="submit"
                >
                  Create account
                </Button>
              </form>
            </div>
          </div>
        </Box>
        <Box textAlign="center" mt="6">
          Already have an account?
          <Text ml="2" display={"inline"} color={"orange.200"}>
            <Link to="/login">Login</Link>
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default SignUp;
