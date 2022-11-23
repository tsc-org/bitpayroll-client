import { Link } from "react-router-dom";
import '../../App.css'
import styles from './home.module.scss'
import heropicture from "../../assets/landingpage-group.png"
import { Button, ButtonGroup, Container, Heading, Stack, Text } from '@chakra-ui/react'


const Home = () => {
    return (
        <div className={styles.landingPageBody}>
            <Heading fontSize="32px" fontWeight="700" borderBottom="1px solid" borderColor="grey.100" textAlign="center" pt="2%" pb="12px" ml = "5%" mr = "5%" >
                BitPayRoll
            </Heading>
            <Container maxW="978px" mt="3vh" mb={10} centerContent textAlign="center" px={10}>
                <Stack spacing={2}>
                    <Heading fontSize={['24px','32px','48px', '64px']} fontWeight="700" letterSpacing="4px" lineHeight="120%" >
                        Pay your employees in bitcoin with ease
                    </Heading>
                    <Text fontSize={{base: "20px", md: "30px"}} fontWeight="400">
                        Our payroll platform is designed to help organisations pay employees in bitcoin with ease.
                    </Text>
                </Stack>
                <ButtonGroup gap='4' mt={5}>
                    <Link to="/sign-up">
                        <Button minW={{base: "100px", md: "150px"}} fontSize={{base: "12px", md: "16px"}}>Create Account</Button>
                    </Link>
                    <Link to="/login">
                        <Button minW={{base: "100px", md: "150px"}} fontSize={{base: "12px", md: "16px"}} variant='outlined'>Login</Button>
                    </Link>
                </ButtonGroup>

                <div className={styles.heropicture}>
                    <img src={heropicture} alt="heropicture" />
                </div>
            </Container>
        </div>
    )
}

export default Home;