import React, { useState } from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

import Header from "../../layout/header/Header";
import SearchBar from "../../components/Searchbar";
import useSearch from "../../hooks/useSearch";
import MainPage from "../../layout/mainPage/MainPage";

const SingleEmployee = () => {

  const searchFunction = (searchText: string) => {
    console.log(searchText);
  };

  const [addEmployee, setAddEmployee] = useState({
    open: false,
  })

  const { results, searchTerm, handleChange } = useSearch(searchFunction);
  const closeAddEmployee = () => {
    setAddEmployee({ open: false })
  }
  return (
    <>
      <Header>
        <Flex alignItems={"center"} gap="mainPageGapX">
          <Text>Employees</Text>
          <SearchBar
            searchTerm={searchTerm}
            handleChange={handleChange}
            maxW="500px"
            w="100%"
            placeholder="Search for employees"
            bgColor="grey.100"
          />
          <Button variant="primary" size="md"
            onClick={() => setAddEmployee({ open: true })}
          >
            Add new employee
          </Button>
        </Flex>
      </Header>

      <MainPage>
        <Container
          bgColor="white"
          borderRadius="5px"
          maxW="100%"
          width="full"
          p={10} >
          <Box display={{ md: "flex" }}
          >
            <Box bg="#16697A"  borderRadius="50%" width={"210px"} height={"210px"}>
              <Text fontSize="9xl" color="white" textAlign={"center"}> SA</Text>
            </Box>

            <Stack marginLeft={7} mt={7}>
              <Text fontSize="28px" fontWeight={"500px"} color ="#232323">Samson Adetunji</Text>
              <Text fontSize="22px"  fontWeight={"500px"} color={"rgba(75, 75, 75, 1)"}>Wallet address: 123456789011</Text>
              <Text fontSize="22px"  fontWeight={"500px"} color={"rgba(75, 75, 75, 1)"}>Email address: samueladeji@gmail.com</Text>
            </Stack>

          </Box>

          <Box display={{ md: "flex" }} mt={10}  justifyContent={"space-between"}>
            <Stack>
              <Text fontSize="1xl" mt={.5}>First name: Samson</Text>
              <Text fontSize="1xl" mt={.5}>Email address: samueladeji@gmail.com</Text>
            </Stack>
            <Stack>
              <Text fontSize="1xl">Last name: Adetunji</Text>
              <Text fontSize="1xl">Join date: 24th July 2022</Text>
            </Stack>
          </Box>
          <Text fontSize="1xl" mt={4}>Last transaction</Text>


        </Container>
      </MainPage>
    </>

  )
}

export default SingleEmployee