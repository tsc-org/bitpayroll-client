import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import AddEmployee from "../../components/AddEmployee";
import SearchBar from "../../components/Searchbar";
import BaseTable from "../../components/Table/Table";
import useAuth from "../../hooks/useAuth";
import useEmployees from "../../hooks/useEmployees";
import useSearch from "../../hooks/useSearch";
import Header from "../../layout/header/Header";
import MainPage from "../../layout/mainPage/MainPage";

const tableStructure = [
  {
    type: "text",
    name: "First Name",
    value: (row: any) => row.firstName,
  },
  {
    type: "text",
    name: "Last Name",
    value: (row: any) => row.lastName,
  },
  {
    type: "text",
    name: "Wallet Address",
    value: (row: any) => row.wallet_address,
  },
  {
    type: "text",
    name: "Email",
    value: (row: any) => row.email,
  },
  {
    type: "cta",
    name: null,
    value: (row: any) => "View employee details",
  },
]

const Employees = () => {

  const { auth } = useAuth();
  const toast = useToast();

  const [addEmployee, setAddEmployee] = useState({
    open: false,
  })


  const {employees, inviteEmployee} = useEmployees()

  const searchFunction = (searchText: string) => {
    console.log(searchText);
  };
  const { results, searchTerm, handleChange } = useSearch(searchFunction);

  const closeAddEmployee = () => {
    setAddEmployee({open: false})
  }

  const numberOfEmployees = () => {
    if (employees.isLoading) return <Spinner size="xs" />;
    if (employees.isSuccess) return `(${employees.data.length})`;
    return "n/a";
  };

  const onSendInvite = ({email, salary}: {email: string, salary: number}) => {
    let body = {
      email,
      salary
    }
    if (!auth.userId) return
    inviteEmployee.mutate(body)
    // setInviteLoading(true)
    // axios.post(endpoints.SEND_INVITE(auth.userId), body)
    //     .then((res) => {
    //         toast({
    //         title: "Success",
    //         description: `Invite sent to ${email} `,
    //         status: "success",
    //         duration: 3000,
    //         isClosable: true,
    //         });
    //     })
    //     .catch(err => {
    //         const errMessage = err?.response?.data?.message || "Please try again later";
    //         toast({
    //             title: "Unable to send invite",
    //             description: errMessage,
    //             status: "error",
    //             duration: 6000,
    //             isClosable: true,
    //         });
    //     }).finally(() => {
    //         setInviteLoading(false)
    //     })

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
            onClick={() => setAddEmployee({open: true})}
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
          flex="1 1 100%"
          p={0}
        >
          <Box p="mainPageGapX" >Registered Employees {numberOfEmployees()}</Box>
          <BaseTable title="Showing all entries" tableStructure={tableStructure} tableData={employees.isSuccess ? employees.data : []} loading={employees.isLoading}  />
          <AddEmployee isOpen={addEmployee.open} handleClose={closeAddEmployee} handleSubmit={onSendInvite} inviteLoading={inviteEmployee.isLoading} />
        </Container>
      </MainPage>
    </>
  );
};

export default Employees;
