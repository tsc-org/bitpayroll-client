import { Link } from "react-router-dom";
import '../../App.css'
import styles from './home.module.scss'
import heropicture from "../../assets/landingpage-group.png"
import { Button, ButtonGroup, Container, Heading, Stack, Text } from '@chakra-ui/react'


const Home = () => {
    return (
        <div className={styles.landingPageBody}>
            <Heading fontSize="32px" fontWeight="700" borderBottom="1px solid" borderColor="grey.100" textAlign="center" pt="5%" pb="12px" >
                BitPayRoll
            </Heading>
            <Container maxW="978px" mt="10%" mb={10} centerContent textAlign="center" px={10}>
                <Stack spacing={2}>
                    <Heading fontSize={['24px','32px','48px', '64px']} fontWeight="700" letterSpacing="4px" lineHeight="150%" >
                        Pay your employees in bitcoin with ease
                    </Heading>
                    <Text fontSize={{base: "14px", md: "24px"}} fontWeight="400">
                        Our payroll platform is designed to help organisations pay employees in bitcoin with ease.
                    </Text>
                </Stack>
                <ButtonGroup gap='4' mt={12}>
                    <Link to="/sign-up">
                        <Button minW={{base: "100px", md: "150px"}}>Create Account</Button>
                    </Link>
                    <Link to="/login">
                        <Button minW={{base: "100px", md: "150px"}} variant='outlined'>Login</Button>
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