import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Header from "../../layout/header/Header";
import MainPage from "../../layout/mainPage/MainPage";
import styles from "./sendPayment.module.scss";
import CheckBoxList from "../../components/CheckBoxList/CheckBoxList";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { Field, FieldProps, Form, Formik } from "formik";
import { Employee } from "../../types";
import useEmployees from "../../hooks/useEmployees";
import useAuth from "../../hooks/useAuth";
import useUSDTOBTC from "../../hooks/useUSDTOBTC";
import { moneyValueFormat } from "../../helpers/moneyFormat";
import { AnimatePresence, motion } from "framer-motion";
import NumberOfEmployees from "../../components/NumberOfEmployees";

interface OrgState {
  loading: boolean;
  data: {
    balance: number;
    registered_employees: number;
  };
  error: boolean;
}

interface SubmitValues {
  amount: number;
  description: string;
}

const SendPayment = () => {
  
  const [orgData, setOrgData] = useState<OrgState>({
    loading: true,
    data: {
      balance: 200,
      registered_employees: 15
    } as OrgState["data"],
    error: false,
  });

  const [selectList, setSelectList] = useState({
    open: false,
  })
  const [checkedIds, setCheckedIds] = useState([] as number[])

  const [calculatedAmount, setCalculatedAmount] = useState(0)

  const {employees} = useEmployees()

  const {price, singlePrice} = useUSDTOBTC()

  const {auth} = useAuth()

  const toggleCheck = (e: React.ChangeEvent<HTMLInputElement>, idx: number) : void => {
    const checked = e.target.checked
    if (checked) {
        setCheckedIds(prev => [...prev, idx])
    } else {
        setCheckedIds(prev => {
            let _updated = prev.filter(id => id !== idx)
            return _updated
        })
    }
  }

  const onOpenSelect = () => {
    setSelectList(prev => ({...prev, open: true}))
  }

  const selectAll = () => {
    if (employees.isSuccess) {
      let N = employees.data.length
      let allCheckedIds = [...Array(N).keys()]
      setCheckedIds(allCheckedIds)
    }
  }

  const clearSelection = () => {
    setCheckedIds([])
  }

  // FORM
  const paymentDescRef = useRef("")
  const initialValues: SubmitValues = {
    amount: 0,
    description: "",
  }
  function validateAmount(value: number) :string | null {
    let error = null
    if (!value) {
      error = 'Amount is required and cannot be 0'
    } else if (value > orgData.data?.balance) {
      error = "You can't send more than the available balance"
    }
    return error
  }
  function validateDescription(value: string) :string | null {
    let error = null
    paymentDescRef.current = value
    if (!value || value === "") {
      error = 'Description is required'
    }
    return error
  }

  const moneyValueInput = () => {
    let usdVal = moneyValueFormat(calculatedAmount)
    let btcVal = (singlePrice && calculatedAmount) ? (calculatedAmount/singlePrice) : null
    let format = btcVal ? `${usdVal} ≈ ${btcVal} BTC` : usdVal
    return format
  }

  const onSendPayment = (values: SubmitValues) :void => {

    if (!employees.isSuccess || !checkedIds.length) return
    const selectedEmployees = checkedIds.map((idx: number) => {
      if (!employees.data[idx].id) return
      return ({
        employeeIds: employees.data[idx].id,
        salary: employees.data[idx].salary
      })
    })
    const body = {
      employees: selectedEmployees,
      amount: values.amount
    }
    // axios.post(endpoints.SEND_PAYMENT(auth.userId), body)
    // .then(res => customToast({isSuccess: true}))
    // .catch(err => customToast({isSuccess: false, desc: err?.response?.data?.message || "Please try again later"}))
  }

  useEffect(() => {
    const employeesData = employees.isSuccess ? employees.data : []
    const amount = (idx: number) => {
      let _employee = employeesData[idx] || null
      if (_employee) {
        if (_employee?.salary) return _employee.salary
      }
      return 0
    }
    const sum = checkedIds.reduce((a,b) => {
      return (a + amount(b))
    }, 0)

    setCalculatedAmount(sum)
  
  }, [checkedIds])
  

  return (
    <>
      <Header header="Send payment" />
      <MainPage>
        <section className={styles.banner}>
          <Stack spacing="8px">
            <Text fontWeight={500} fontSize={{ base: "14px", md: "18px" }}>
              Available Balance
            </Text>
            <Text fontWeight={700} fontSize={{ base: "20px", md: "28px" }}>
              200 BTC
            </Text>
          </Stack>
          <Stack>
            <Text fontWeight={500} fontSize={{ base: "14px", md: "18px" }}>
              Total number of registered employee
            </Text>
            <Box fontWeight={700} fontSize={{ base: "20px", md: "28px" }}>
              <NumberOfEmployees employees={employees} />
            </Box>
          </Stack>
        </section>
        <Container
          mt="mainPageGapY"
          bgColor="white"
          borderRadius="5px"
          maxW="100%"
          width="full"
          flex="1 1 100%"
          p={0}
        >
          {/* Select Employee/All */}
          <Flex p={{base:"mainPageGapXsm", md: "mainPageGapXsm"}} gap={{base:"mainPageGapXsm", md: "mainPageGapXsm"}} alignItems="center" flexWrap="wrap" >
            <Button bgColor="grey.100" textAlign="left" rightIcon={<IoMdArrowDropdown />} 
              justifyContent="space-between" color="grey.375" 
              fontSize={{base: "16px", md:"18px"}} fontWeight="500" p="18px !important" 
              width="50%"
              onClick={onOpenSelect}
              variant={"solid"}
            >
              Select employee
            </Button>
            <Button variant={"ghost"} ml="auto" size={{base: "sm", md:"md"}} color="orange.275" >View selected</Button>
            <Button onClick={selectAll} size={{base: "sm", md:"md"}}>Select all registered employee</Button>
          </Flex>

          {/* Employees horizontal list */}
          <AnimatePresence>
            {checkedIds.length && <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: checkedIds.length ? 1 : 0, y:0, transition: {duration: 0.6} }} exit={{opacity: 0, y: 40, transition: {duration: 0.6}}} className={`${styles.view_employees_box}`}>
              {checkedIds.map((idx) => (
                <EmployeeProfileBox key={idx} employeeIdx={idx} data={employees.isSuccess ? employees.data : []} />
              ))}
            </motion.div>}
          </AnimatePresence>

          {/* Payment Form  */}
          <Flex p={{base:"mainPageGapXsm", md: "mainPageGapX"}} gap="mainPageGapX" flexDirection={{base: "column", lg: "row"}} justifyContent="space-between"
            className={`${styles.payment_section} ${!selectList.open ? styles.payment_section_visible : styles.payment_section_hidden }`}  
          >
            <Formik
              initialValues={initialValues}
              onSubmit={onSendPayment}
            >
              {props => (
                <Form 
                  className={styles.form_container} 
                >
                  <Field name="amount" validate={validateAmount}>
                    {(props: FieldProps) => (
                      <FormControl isInvalid={false}>
                        <Input {...props.field} value={moneyValueInput()} disabled placeholder='Enter amount to send' type="text" />
                        <FormErrorMessage>{`${props.form.errors?.amount}`}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description" validate={validateDescription}>
                    {(props: FieldProps) => (
                      <FormControl isInvalid={(props.form.errors.description && props.form.touched.description) ? true : false}>
                        <Input {...props.field} placeholder='Enter payment description' type="text" />
                        <FormErrorMessage>{`${props.form.errors?.description}`}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button type="submit" >Send Payment</Button>
                </Form>
              )}
            </Formik>
            <div className={styles.payment_review} >
              <h3>Payment review</h3>
              <div className={styles.flex_row_detail}>
                <Text fontSize={{base: "12px", md:"16px"}} >Number of receivers selected:</Text>
                <div className={styles.detail_value} >{checkedIds.length}</div>
              </div>
              <div className={styles.flex_row_detail} >
                <Text fontSize={{base: "12px", md:"16px"}} >Total amount sent:</Text>
                <div className={styles.detail_value} >0 BTC</div>
              </div>
              <Flex gap={2} flexDirection="column">
                <Text fontSize={{base: "12px", md:"16px"}} >Payment description:</Text>
                <Text >{paymentDescRef.current}</Text>
              </Flex>
              <Button variant="ghost" bgColor="grey.200" size="sm"
               _hover={{color: "grey.400", bgColor:"grey.175"}} 
               color="white"
              >
                Make a schedule
              </Button>
            </div>
          </Flex>

          {/* Select employees checkbox table */}
          <Box p={{base:"mainPageGapXsm", md: "mainPageGapX"}}
            className={`${styles.select_container} ${selectList.open ? styles.select_container_visible : styles.select_container_hidden }`} 
          >
            <CheckBoxList checkedIds={checkedIds} employees={employees} toggleCheck={toggleCheck} clearSelection={clearSelection} selectList={selectList} setSelectList={setSelectList} />
          </Box>
        </Container>
      </MainPage>
    </>
  );
};

export const EmployeeProfileBox = ({employeeIdx, data}: {employeeIdx: number, data: Employee[]}) => {
  const fnInitial = getInitial(data[employeeIdx]?.firstName)
  const lnInitial = getInitial(data[employeeIdx]?.lastName)

  function getInitial(value: Employee["firstName"]) {
    if (typeof(value) === "string") {
      if (value.length === 0) return "-"
      return value[0]
    } else {
      return "-"
    }
  }
  return (
    <AnimatePresence>
      <Center as={motion.div} initial={{opacity: 0, x: 400}} animate={{opacity: 1, x:0, transition: {duration: 0.7, type: "spring",damping: 16,stiffness: 100} }} 
        exit={{opacity: 0, y: 40, transition: {duration: 0.6}}} 
        flex={"0 0 75px"} h="75px" bgColor="grey.150" borderRadius="100%" 
      >
        <Text fontWeight={700} fontSize={{base: "16px", md: "28px"}} >{fnInitial} {lnInitial}</Text>
      </Center>
    </AnimatePresence>
  )
}

export default SendPayment;
