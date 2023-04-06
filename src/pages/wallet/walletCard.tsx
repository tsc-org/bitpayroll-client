import React from 'react'
import Card from '../../components/Card/Card'
import pebbleBg from "../../assets/images/pebbles-Box-svg.svg";
import walletIcon from "../../assets/icons/walletIcon.svg";
import axios from 'axios';
import endpoints from '../../api/endpoints';
import { useQuery } from 'react-query';
import { WalletType } from './wallet';
import { btcFormat } from '../../helpers/btcFormat';
import { WalletIcon, WalletIconTwo } from '../../chakra/custom-chakra-icons';
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

interface walletBalanceRespone {
    network: string,
    address: string,
    confirmed_balance: string,
    unconfirmed_balance: string
}

const WalletCard = ({wallet, idx}: {wallet: WalletType, idx: number}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const fetcher = async() :Promise<walletBalanceRespone> => {
    return axios.get(endpoints.GET_WALLET_BALANCE(wallet.address)).then(res => res.data.data)
  }

  const walletBalance = useQuery(`walletBalance_${idx}`, fetcher)

  return (
    <Box minW="250px" borderRadius="5px" border="1px solid" borderColor="gray.400" p="mainPageGapYsm">
      <Flex justifyContent="space-between" gap="2" w="full">
        <WalletIconTwo boxSize={{base: "28px", md: "36px", lg: "56px"}} />
        <Button
          // ml="20%"
          variant="primary"
          size="xs"
          borderRadius="4px"
          onClick={() => setSearchParams({"addFunds": `${idx}`})}
        >
          + Add funds
        </Button>
      </Flex>
      <Flex direction="column" mt="3" color="grey.400">
        <Text fontSize={{base: "16px", md: "20px"}} fontWeight="700">Wallet {idx}</Text>
        <Box display="inline-flex" gap={3}>
          <Text>Total Amount -</Text>
          <Text fontWeight="600">
            {btcFormat(walletBalance.data?.confirmed_balance)}
          </Text>
        </Box>
      </Flex>
    </Box>
    // <Card
    //     imgSrc={pebbleBg}
    //     icon={WalletIcon}
    //     bgColor="grey.200"
    //     title="Your wallet"
    //     value={btcFormat(walletBalance.data?.confirmed_balance)}
    //     actionText="Add funds"
    //     loading={walletBalance.isLoading}
    // />
  )
}

export default WalletCard