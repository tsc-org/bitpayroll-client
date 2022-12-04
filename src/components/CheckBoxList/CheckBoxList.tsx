import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./CheckBoxList.module.scss";
import { FaSearch } from "react-icons/fa"
import { Employee } from "../../types";
import { UseQueryResult } from "react-query";
import BaseTable from "../Table/Table";

interface Props {
  employees: UseQueryResult<Employee[], unknown>;
  toggleCheck: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  selectList: {
    open: boolean;
  };
  checkedIds: number[];
  setSelectList: (x: any) => void;
  clearSelection: () => void;
}

const CheckBoxList = ({ checkedIds, employees, toggleCheck, clearSelection, selectList, setSelectList }: Props) => {
  
  const CheckBoxTS = [
    {
      name: "name",
      type: "text",
      value: (row: Employee) => `${row?.firstName ?? 'N/A'} ${row?.lastName ?? 'N/A'}`,
    },
    {
      name: "wallet",
      type: "text",
      value: (row: Employee) => row.wallet_address,
    },
    {
      name: "salary",
      type: "text",
      value: (row: Employee) => row.salary ? `${row.salary}` : null,
    },
  ]

  const onRenderCheckBox = (row: Employee, idx: number) => (
    <Checkbox 
      id={`checkedIds-${idx}`} 
      colorScheme={"orange"} 
      onChange={(e) => toggleCheck(e, idx)} 
      isChecked={checkedIds.includes(Number(idx))}
      />
  )
  
  if (!selectList.open) return null;

  return (
    <Box p={{base: "mainPageGapXsm", md: "mainPageGapX"}} border="1px solid" borderColor="grey.100" borderRadius="15px" >
        <Flex mb="12" gap="10%" alignItems="center" >
            <InputGroup >
                <InputLeftElement
                    pointerEvents='none'
                    children={<FaSearch/>}
                    zIndex="0"
                />
                <Input type="text" placeholder="search for employee" />
                {/* <InputRightElement width={"auto"} pr="10px" zIndex="0"
                    children={
                        <Button size="sm">
                            Search
                        </Button>
                    }
                /> */}
            </InputGroup>
        </Flex>
        <Flex fontWeight="300" py={4} gap={{base: 4, md: 8}} alignItems="center" flexWrap={"wrap"} >
            <Text>Selected {checkedIds.length} out of {employees.isLoading? <Spinner/> : employees.isSuccess ? employees.data.length : "N/A"}</Text>
            <Flex gap={4}>
              <Button variant={"outline"} size="sm" onClick={clearSelection}>Clear</Button>
              <Button size="sm" onClick={() => setSelectList({open: false})}>Done</Button>
            </Flex>
        </Flex>
        <BaseTable 
          tableData={employees.isSuccess ? employees.data : []}
          tableStructure={CheckBoxTS}
          loading={employees.isLoading}
          hasCheckBox
          onRenderCheckBox={onRenderCheckBox}
        />
        {/* <TableContainer>
          <Table variant="striped">
            <Tbody>
              {employeesData.map((emp, idx: number) => (
                <Tr key={idx} >
                    <Td>
                        <Checkbox 
                        id={`checkedIds-${idx}`} 
                        colorScheme={"orange"} 
                        onChange={(e) => toggleCheck(e, idx)} 
                        isChecked={checkedIds.includes(Number(idx))}
                        />
                    </Td>
                    <Td><label htmlFor={`checkedIds-${idx}`}>{emp?.firstName} {emp?.lastName}</label></Td>
                    <Td><label htmlFor={`checkedIds-${idx}`}>{emp.wallet_address}</label></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer> */}
    </Box>
  );
};

export default CheckBoxList;
