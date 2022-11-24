import { Button, Grid, GridItem, SimpleGrid} from '@chakra-ui/react'
import Card from '../../components/Card/Card'
import Header from '../../layout/header/Header'
import MainPage from '../../layout/mainPage/MainPage'
import pebbleBg from "../../assets/images/pebbles-Box-svg.svg"
import { BitcoinIcon, GroupEmployeeIcon, WalletIcon } from '../../chakra/custom-chakra-icons'

const Dashboard = () => {
  return (
    <>
      <Header header="Dashboard" />
      <MainPage>
        <Grid templateColumns={['repeat(2, 1fr)', null, null, 'repeat(3, 1fr)']}  gap={{base: "mainPageGapYsm", md: "mainPageGapY"}}>
          <GridItem colSpan={[2, null , null, 1]}>
            <Card imgSrc={pebbleBg} icon={WalletIcon} bgColor="grey.200" title='Your wallet' value='200 BTC' actionText='Add funds' />
          </GridItem>
          <GridItem>
            <Card icon={GroupEmployeeIcon} title='Registered employees' value='100' actionText='View all' />
          </GridItem>
          <GridItem>
            <Card imgSrc={pebbleBg} icon={BitcoinIcon} bgColor="grey.200" title='Total amount disbursed' value='200' actionText='View transactions' />
          </GridItem>
        </Grid>
      </MainPage>
    </>
  )
}

export default Dashboard