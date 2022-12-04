import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Flex,
  Text,
  Input,
  Box,
  InputGroup,
  Stack,
  FormControl,
  FormLabel,
  InputLeftAddon,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa"
import axios from "../api/axios";
import endpoints from "../api/endpoints";
import { moneyValueFormat } from "../helpers/moneyFormat";

interface Props {
  data?: any;
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (data?: any) => void;
  inviteLoading: boolean;
}

const currency = "$";
const getPureMoneyVal = (value: string)  => {
  return value.replaceAll(",", "").replaceAll(currency, "");
};
const parseMoneyValue = (value: string) => {
  let _pureValue = getPureMoneyVal(value);
  return moneyValueFormat(_pureValue, currency);
};

const AddEmployee: React.FC<Props> = ({
  isOpen,
  handleClose,
  handleSubmit,
  inviteLoading,
}) => {

    const [addedEmployees, setAddedEmployees] = useState([] as string[])
    const [formData, setFormData] = useState({
        email: "",
        salary: ""
    })
    const inputRef = useRef(null) as any

    const hasRendered = useRef(false)
    
    const addToList = () => {
        let email = inputRef?.current?.value
        console.log(email)
        if (email) {
            setAddedEmployees(prev => {
                return [...prev, email]
            })
            inputRef.current.value = ""
        }
    }

    const removeEmail = (email: string) => {

    }

    const addListenerToButton = useMemo(() => {
        if (inputRef.current) {

            inputRef?.current?.addEventListener('keypress', (e: any) => {
                if (e.key === "Enter") {
                    e.preventDefault()
                    addToList()
                }
            })
        }

    }, [inputRef, hasRendered])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name
        let value = e.target.value
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSendInvite = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            email: formData.email,
            salary: parseInt(getPureMoneyVal(formData.salary))
        }
        handleSubmit(data)
    }

    // useEffect(() => {
    //     if (inputRef.current) {

    //         inputRef?.current?.addEventListener('keypress', (e: any) => {
    //           if (e.key === "Enter") {
    //               e.preventDefault()
    //               addToList()
    //           }
    //         })
    //     }

    // }, [inputRef])
    

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add employees to your organisation</ModalHeader>

          <ModalBody>
            <Box py="mainPageGapX">
                <form onSubmit={handleSendInvite}>
                    <Stack spacing={6} mb="80px">
                        <FormControl>
                            <FormLabel>Employee email</FormLabel>
                            <Input
                                ref={inputRef}
                                fontSize={{base: "sm", md: "md"}}
                                name="email"
                                placeholder="Enter employee email"
                                type={"email"}
                                border="0.5px solid"
                                borderColor="grey.100"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Employee salary</FormLabel>
                            <InputGroup>
                                <InputLeftAddon fontSize={{base: "12px", md: "14px"}} fontWeight="semibold" children="USD" />
                                <Input
                                    fontSize={{base: "sm", md: "md"}}
                                    name="salary"
                                    placeholder="Enter salary in USD"
                                    type="text"
                                    border="0.5px solid"
                                    borderColor="grey.100"
                                    value={formData.salary}
                                    onChange={(e) => {
                                        if (e.target?.value) {
                                            e.target.value = parseMoneyValue(e.target?.value);
                                            handleChange(e);
                                          }
                                    }}
                                    required
                                />
                            </InputGroup>
                        </FormControl>
                    </Stack>
                    <Button type="submit" minW="50%" isLoading={inviteLoading} >
                        Send invite to Employee
                    </Button>
                </form>
            </Box>
            {/* <Box>
                <Text>Employee email</Text>
                <InputGroup>

                    <Input ref={inputRef} type="text" placeholder="Enter employee email" />
                    <InputRightElement width={"auto"}>
                        <IconButton icon={<FaPlus />} aria-label="click to add employee" onClick={addToList} />
                    </InputRightElement>
                </InputGroup>
                <Flex w="100%" minH="100px" 
                    overflowY="scroll" flexWrap="wrap" 
                    border="1px solid" borderColor="grey.175" 
                    borderRadius="lg" alignItems="flex-start" 
                    gap="8px" 
                    padding={{base: "8px", md: "12px"}}
                >
                    {
                        addedEmployees.map((email, idx) => (
                            <Tag
                                size={"sm"}
                                key={idx}
                                borderRadius='full'
                                variant='solid'
                                colorScheme='blue'
                                >
                                <TagLabel>{email}</TagLabel>
                                <TagCloseButton onClick={() => removeEmail(email)} />
                            </Tag>
                        ))
                    }
                </Flex>
            </Box> */}
          </ModalBody>

        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddEmployee;
