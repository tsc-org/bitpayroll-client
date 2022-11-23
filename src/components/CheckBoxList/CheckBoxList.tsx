import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MockDataSingle } from "../../helpers/mockData";
import styles from "./CheckBoxList.module.scss";
import { FaSearch } from "react-icons/fa"

interface Props {
  employeesData: MockDataSingle[];
  toggleCheck: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
  selectList: {
    open: boolean;
  };
  checkedIds: number[];
  setSelectList: (x: any) => void;
}

const CheckBoxList = ({ checkedIds, employeesData, toggleCheck, selectList, setSelectList }: Props) => {
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
                <InputRightElement width={"auto"} pr="10px" zIndex="0"
                    children={
                        <Button size="sm">
                            Search
                        </Button>
                    }
                />
            </InputGroup>
        </Flex>
        <Flex fontWeight="300" py={4} gap="10%" alignItems="center" >
            <Text>Selected {checkedIds.length} out of {employeesData.length}</Text>
            <Button size="sm" onClick={() => setSelectList({open: false})}>Done</Button>
        </Flex>
        <TableContainer>
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
                    <Td><label htmlFor={`checkedIds-${idx}`}>{emp.address}</label></Td>
                </Tr>
                // <div className={styles.checkbox_container} key={idx}>
                //   <input
                //     type="checkbox"
                //     name="checkedIds"
                //     id={`checkedIds-${idx}`}
                //     onChange={(e) => toggleCheck(e, idx)}
                //   />
                //   <label htmlFor={`checkedIds-${idx}`}>
                //     <p>
                //       {emp?.firstName} {emp?.lastName}
                //     </p>
                //   </label>
                //   {/* <Checkbox display="flex" flexDirection="row" onChange={(e) => toggleCheck(e, idx)}>
                //             <Text flex={"0 0 100px"} >
                //                 {emp?.firstName} {emp?.lastName}
                //             </Text>
                //             <Text flex={"0 0 100px"}>
                //                 {emp.id}
                //             </Text>
                //             <Text flex={"0 0 100px"}>
                //                 {emp.address}
                //             </Text>
                //         </Checkbox> */}
                // </div>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    </Box>
  );
};

export default CheckBoxList;
