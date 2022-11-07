import { Button} from '@chakra-ui/react'
import Header from '../../layout/header/Header'
import MainPage from '../../layout/mainPage/MainPage'

const Dashboard = () => {
  return (
    <>
        <Header header="Dashboard" />
        <MainPage>
            <p>Dashboard</p>
            <p>Example of a customized chakra button</p>
            <Button variant={'primary'}>Continue</Button>
        </MainPage>
    </>
  )
}

export default Dashboard