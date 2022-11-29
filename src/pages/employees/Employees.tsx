import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import {
  BitcoinIcon,
  GroupEmployeeIcon,
  WalletIcon,
} from "../../chakra/custom-chakra-icons";
import AddEmployee from "../../components/AddEmployee";
import SearchBar from "../../components/Searchbar";
import useAuth from "../../hooks/useAuth";
import useSearch from "../../hooks/useSearch";
import Header from "../../layout/header/Header";
import MainPage from "../../layout/mainPage/MainPage";

const Employees = () => {
  const searchFunction = (searchText: string) => {
    console.log(searchText);
  };
  const { auth } = useAuth();

  const toast = useToast();

  const [addEmployee, setAddEmployee] = useState({
    open: false,
  })

  const [inviteLoading, setInviteLoading] = useState(false)

  const { results, searchTerm, handleChange } = useSearch(searchFunction);

  const closeAddEmployee = () => {
    setAddEmployee({open: false})
  }

  const getFetcher = async () => {
    return axios
      .get(endpoints.GET_ALL_EMPLOYEES(auth.userId))
      .then((res) => res.data);
  };

  const employees = useQuery("wallets", getFetcher);

  const numberOfEmployees = () => {
    if (employees.isLoading) return <Spinner size="xs" />;
    if (employees.data) return employees.data?.employee?.length;
    return "n/a";
  };

  const onSendInvite = (email: string) => {
    let body = {
        email
    }
    if (!auth.userId) return
    setInviteLoading(true)
    axios.post(endpoints.SEND_INVITE(auth.userId), body)
        .then((res) => {
            toast({
            title: "Success",
            description: `Invite sent to ${email} `,
            status: "success",
            duration: 3000,
            isClosable: true,
            });
        })
        .catch(err => {
            const errMessage = err?.response?.data?.message || "Please try again later";
            toast({
                title: "Unable to send invite",
                description: errMessage,
                status: "error",
                duration: 6000,
                isClosable: true,
            });
        }).finally(() => {
            setInviteLoading(false)
        })

    }

  const employeesTable = () => (
    <>
        <Text>Showing all entries</Text>
        <TableContainer>
        <Table variant="striped">
            <Thead>
                <Tr>
                    <Th>First name</Th>
                    <Th>last name</Th>
                    <Th>Wallet address</Th>
                    <Th>Email address</Th>
                    <Th></Th>
                </Tr>
            </Thead>
        </Table>
        </TableContainer>
    </>
  );

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
          p={"mainPageGapX"}
        >
          <Box>Registered Employees ({numberOfEmployees()})</Box>
          {employeesTable()}
          <AddEmployee isOpen={addEmployee.open} handleClose={closeAddEmployee} handleSubmit={onSendInvite} inviteLoading={inviteLoading} />
        </Container>
      </MainPage>
    </>
  );
};

export default Employees;
