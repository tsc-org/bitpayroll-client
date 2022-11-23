import { Button, IconButton } from "@chakra-ui/button";
import { Box, Container, Flex, Text, Spinner, Image, Icon, InputGroup, InputLeftAddon, Input, InputRightElement, useToast, Tooltip, Highlight } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../../layout/header/Header";
import MainPage from "../../layout/mainPage/MainPage";
import Card from "../../components/Card/Card";
import pebbleBg from "../../assets/images/pebbles-Box-svg.svg";
import walletIcon from "../../assets/icons/walletIcon.svg";
import CustomModal from "../../components/CustomModal";
import axios from "../../api/axios";
import endpoints from "../../api/endpoints";
import useAuth from "../../hooks/useAuth";
import { MdCancel } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import CheckCircle from "../../assets/icons/check-circle.svg";
import WalletCard from "./walletCard";
import { useQuery } from "react-query";

export interface WalletType {
    address: string;
}

const Wallet = () => {
//   const [orgData, setOrgData] = useState({
//     loading: false,
//     wallets: [],
//   });

  const { auth } = useAuth();
  const toast = useToast()

  const initialWalletModal = {
    open: false,
    loading: false,
    data: {
        mnemonic: "",
        address: ""
    },
    error: {
      state: false,
      message: "",
    },
    seed: {
        copied: false,
        error: false,
    }
  };
  const [newWalletModal, setNewWalletModal] = useState(initialWalletModal);
  
    const getFetcher = async() :Promise<WalletType[]>  => {
        return axios.get(endpoints.GET_ALL_ORG_WALLETS(auth.userId)).then(res => res.data)
    }

  const { data: walletsData, error: walletsError, isLoading: walletsLoading, refetch: walletsRefetch} = useQuery('wallets', getFetcher)

  const createWallet = () => {
    setNewWalletModal({ ...initialWalletModal, open: true, loading: true });
    axios
      .post(endpoints.CREATE_WALLET(auth.userId))
      .then((res) => {
        let data = res.data;
        setNewWalletModal((prev) => ({ ...prev, data, loading: false }));
        walletsRefetch()
      })
      .catch((err) => {
        const errMessage =
          err?.response?.data?.message || "Please try again later";
        let error = {
          state: true,
          message: errMessage,
        };
        setNewWalletModal((prev) => ({ ...prev, error, loading: false }));
      });
  };

  const closeModal = () => {
    if (newWalletModal.seed.copied || newWalletModal.seed.error) {
        setNewWalletModal(initialWalletModal);
    } else {
        toast({
            title: '',
            description: "Copy mnemonic seed before exiting modal",
            status: 'warning',
            duration: 6000,
            isClosable: true,
          })
    }

  };

  const copyMnemonic = async() => {
    let text = newWalletModal.data.mnemonic
    try {
        await navigator.clipboard.writeText(text);
        toast({
            title: 'Success',
            description: "Seed copied to clipboard",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        let seed = {
            copied: true,
            error: false,
        }
        setNewWalletModal(prev => ({...prev, seed, open: true}))

    } catch (err) {
        toast({
            title: 'Error',
            description: "Couldn't copy. Please copy manually",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        let seed = {
            copied: false,
            error: true,
        }
        setNewWalletModal(prev => ({...prev, seed}))
    }
  }

  const addFunds = () => {};

  const NewWalletDialog = () => (
    <Box textAlign="center" pb="20px">
      <Flex direction="column" gap="2rem">
        {newWalletModal.loading ? (
            <>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="orange.200"
                    color="grey.100"
                    size="xl"
                    mx="auto"
                />
                <div>
                <Text>Creating your wallet</Text>
                </div>
            </>)
            : newWalletModal.error.state 
            ? (
                <>
                <Icon as={MdCancel} fontSize="80px" color="red.500" />
                <Text color="red.400">{newWalletModal.error.message}</Text>
                </>
            ) : (
                <>
                    <Image src={CheckCircle} mx="auto" />
                    <Text fontSize="12px">
                        <Highlight query='copy'
                            styles={{ fontWeight: "700", fontSize: "14px" }}
                        >
                            Wallet Created. Please copy the mnemonic below, it is important for account recovery. This mnemonic is lost after closing modal. 
                        </Highlight>
                    </Text>
                    <InputGroup>
                        <InputLeftAddon children='mnemonic' />
                        <Input type='tel' placeholder='phone number' value={newWalletModal.data?.mnemonic} onChange={() => {}} />
                        <InputRightElement children={
                            <Tooltip label={newWalletModal.seed.copied? "copied" : "click to copy"}>
                                <IconButton 
                                aria-label="click to copy mnemonic"
                                icon={<FaCopy/>} 
                                onClick={copyMnemonic}
                                bgColor="grey.400"
                                color="white"
                                />
                            </Tooltip>
                        } 
                        />
                    </InputGroup>
                    {/* <Box textAlign="left" p="5px" background="grey.100" border="2px solid" borderColor="grey.150" borderRadius="lg" overflowY="scroll">
                        {newWalletModal.data?.mnemonic}
                    </Box> */}
                    <Box textAlign="left">
                        <label htmlFor="address">Wallet Address:</label>
                        <Text p="5px" background="grey.100" border="2px solid" borderColor="grey.150" borderRadius="lg">
                            {newWalletModal.data?.address}
                        </Text>
                    </Box>
                </>
            )}

      </Flex>
    </Box>
  );

  return (
    <>
      <Header header="Send payment" />
      <MainPage>
        <Container
          bgColor="white"
          borderRadius="5px"
          maxW="100%"
          width="full"
          h="100%"
          minH="100%"
          p={"mainPageGapX"}
        >
          <Button onClick={createWallet}> Create Wallet</Button>

          <Flex my={"mainPageGapX"} gap={"mainPageGapXsm"} flexWrap="wrap">
            {walletsLoading ? (
              <Card
                imgSrc={pebbleBg}
                icon={walletIcon}
                bgColor="grey.200"
                title="Your wallet"
                value="Placeholder"
                actionText="Add funds"
                loading={walletsLoading}
              />)
              : walletsData
              ? walletsData.map((wallet, idx: number) => (
                  <WalletCard wallet={wallet} idx={idx} key={idx} />
                ))
              : <Text>You have no wallets, create one with the button above</Text>
            }
          </Flex>
        </Container>
      </MainPage>
      <CustomModal
        isOpen={newWalletModal.open}
        handleClose={closeModal}
        heading="Create New Wallet"
        hasCancel
      >
        <NewWalletDialog />
      </CustomModal>
    </>
  );
};

export default Wallet;
