import {
  Box,
  Button,
  Center,
  Container,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CheckCircle from "../assets/icons/check-circle.svg";
import { MdCancel } from "react-icons/md";

interface Props {
  isError: boolean;
  text: string;
  link?: string;
  linkText?: string;
}

const AuthStatus = ({ isError, text, link, linkText }: Props) => {
  return (
    <Center w="full" h="100vh">
      <Container
        maxW="438px"
        textAlign="center"
        p={12}
        fontSize="sm"
        border="0.5px solid"
        borderColor="grey.100"
        borderRadius="10px"
      >
        {isError ? (
          <Icon as={MdCancel} fontSize="80px" color="red.500" />
        ) : (
          <Image src={CheckCircle} mx="auto" />
        )}
        <Stack fontSize="18px" spacing={4} mt="56px" mb="102px">
          <Text fontWeight="500">
            {isError ? "Unuccessful!!" : "Successful!!"}
          </Text>
          <Text>{text}</Text>
        </Stack>
        {link ? (
          <Link to={link}>
            <Button size="full">{linkText}</Button>
          </Link>
        ) : null}
      </Container>
    </Center>
  );
};

export default AuthStatus;
