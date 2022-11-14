import { Button, Grid, GridItem, SimpleGrid} from '@chakra-ui/react'
import Card from '../../components/Card/Card'
import Header from '../../layout/header/Header'
import MainPage from '../../layout/mainPage/MainPage'
import pebbleBg from "../../assets/images/pebbles-Box-svg.svg"
import walletIcon from "../../assets/icons/walletIcon.svg"
import bitcoinIcon from '../../assets/icons/bitcoin.svg'
import groupEmployee from "../../assets/icons/groupemployee_icon.svg"

const Dashboard = () => {
  return (
    <>
      <Header header="Dashboard" />
      <MainPage>
        <Grid templateColumns={['repeat(2, 1fr)', null, null, 'repeat(3, 1fr)']}  gap={{base: "mainPageGapYsm", md: "mainPageGapY"}}>
          <GridItem colSpan={[2, null , null, 1]} w='100%' borderRadius="5px" overflow="hidden">
            <Card imgSrc={pebbleBg} icon={walletIcon} bgColor="grey.200" title='Your wallet' value='200 BTC' actionText='Add funds' />
          </GridItem>
          <GridItem w='100%' borderRadius="5px" overflow="hidden">
            <Card icon={groupEmployee} title='Registered employees' value='100' actionText='View all' />
          </GridItem>
          <GridItem w='100%' borderRadius="5px" overflow="hidden">
            <Card imgSrc={pebbleBg} icon={bitcoinIcon} bgColor="grey.200" title='Total amount disbursed' value='200' actionText='View transactions' />
          </GridItem>
        </Grid>
      </MainPage>
    </>
  )
}

export default Dashboard