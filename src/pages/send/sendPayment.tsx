import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../../layout/header/Header";
import MainPage from "../../layout/mainPage/MainPage";
import styles from "./sendPayment.module.scss"

const SendPayment = () => {
  return (
    <>
        <Header header="Send payment" />
        <MainPage>
            <section className={styles.banner}>
                <Stack spacing="8px">
                    <Text>Available Balance</Text>
                    <Text>200 BTC</Text>
                </Stack>
                <Stack>
                    <Text>Total number of registered employee</Text>
                    <Text>32</Text>
                </Stack>
            </section>
        </MainPage>
    </>
  );
};

export default SendPayment;
