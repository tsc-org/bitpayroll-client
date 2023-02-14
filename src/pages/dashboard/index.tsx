import { Button, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import Card from '../../components/Card/Card'
import Header from '../../layout/header/Header'
import MainPage from '../../layout/mainPage/MainPage'
import pebbleBg from "../../assets/images/pebbles-Box-svg.svg"
import { BitcoinIcon, GroupEmployeeIcon, WalletIcon } from '../../chakra/custom-chakra-icons'
import useEmployees from '../../hooks/useEmployees'
import { btcFormat } from '../../helpers/btcFormat';
import { useQuery } from 'react-query';
import { WalletType } from '../../types'
import axios from 'axios';
import endpoints from '../../api/endpoints';
import useWallet from '../../hooks/useWallet'



interface walletBalanceRespone {
  confirmed_balance: string,
}


const Dashboard = () => {
  const { employees } = useEmployees();
  const noOfEmployees = String(employees.data?.length || 0);

  const {wallet} = useWallet()
  const walletBalance = String(btcFormat("0"))

  

  return (
    <>
      <Header header="Dashboard" />
      <MainPage>
        <Grid templateColumns={['repeat(2, 1fr)', null, null, 'repeat(3, 1fr)']} gap={{ base: "mainPageGapYsm", md: "mainPageGapY" }}>
          <GridItem colSpan={[2, null, null, 1]}>
            <Card imgSrc={pebbleBg} icon={WalletIcon} bgColor="grey.200" title='Your wallet' value={walletBalance}actionText='Add funds' />
          </GridItem>
          <GridItem>
            <Card icon={GroupEmployeeIcon} title='Registered employees' value={noOfEmployees} actionText='View all' />
          </GridItem>
          <GridItem>
            <Card imgSrc={pebbleBg} icon={BitcoinIcon} bgColor="grey.200" title='Total amount disbursed' value= '200' actionText='View transactions' />
          </GridItem>
        </Grid>
      </MainPage>
    </>
  )
}

export default Dashboard