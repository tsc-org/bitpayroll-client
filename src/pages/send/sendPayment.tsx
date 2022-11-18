import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import Header from "../../layout/header/Header";
import MainPage from "../../layout/mainPage/MainPage";
import styles from "./sendPayment.module.scss";
// import pebblesBanner from "../../assets/images/pebbles-h-svg.svg"
import CheckBoxList from "../../components/CheckBoxList/CheckBoxList";
import { useEffect, useState } from "react";
import { getData } from "../../helpers/mockData";
import { IoMdArrowDropdown } from "react-icons/io";

const SendPayment = () => {
  const [employeesData, setEmployeesData] = useState({
    loading: true,
    data: [],
    error: false,
  });
  const [checkedIds, setCheckedIds] = useState([] as number[])
    const toggleCheck = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
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

  useEffect(() => {
    const getEmployeeData = async () => {
        try {
            const data = await getData();
            setEmployeesData(prev => ({...prev, loading: false, data}));
        } catch {
            setEmployeesData(prev => ({...prev, loading: false, error: true}));
        }
    };
    getEmployeeData();
  }, []);

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
            <Text fontWeight={700} fontSize={{ base: "20px", md: "28px" }}>
              32
            </Text>
          </Stack>
        </section>
        <Container
          mt="mainPageGapY"
          bgColor="white"
          borderRadius="5px"
          maxW="100%"
          width="full"
          h="100%"
          p={0}
        >
          <Flex py="2rem" px="mainPageGapX" gap={5} alignItems="center" flexWrap="wrap" >
            <Button bgColor="grey.100" textAlign="left" rightIcon={<IoMdArrowDropdown />} 
            justifyContent="space-between" color="grey.375" 
            fontSize="18px" fontWeight="500" p="18px !important" 
            width="50%"
            >
                Select employee
            </Button>
            <Text>View selected</Text>
            <Button>Select all registered employee</Button>
          </Flex>
          <div className={styles.view_employees_box}>
            {/* <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div>
            <div className={styles.profile_circle}></div> */}
            {/* <div className={styles.profile_circle}></div> */}
            {checkedIds.map((idx) => (
                <EmployeeProfileBox employeeIdx={idx} data={employeesData.data} key={idx} />
            ))}
          </div>
          <Text>FFF</Text>
          <CheckBoxList employeesData={employeesData.data} toggleCheck={toggleCheck} />
        </Container>
      </MainPage>
    </>
  );
};

export const EmployeeProfileBox = ({employeeIdx, data}: any) => {
    return (
        <div className={styles.profile_circle} >
            <Text>{data[employeeIdx]?.firstName[0]} {data[employeeIdx]?.lastName[0]}</Text>
        </div>
    )
}

export default SendPayment;
