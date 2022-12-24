import { Link } from "react-router-dom";
import '../../App.css'
import styles from './home.module.scss'
import heropicture from "../../assets/landingpage-group.png"
import { Button, ButtonGroup, Container, Flex, Heading, HeadingProps, Stack, Text, transition } from '@chakra-ui/react'
import { AnimationControls, HTMLMotionProps, motion, useAnimation, Variants } from "framer-motion";
import SlidingText from "../../components/SlidingText";
import { useRef } from "react";

const Home = () => {
    const controls: AnimationControls = useAnimation()
    const textAnimEnd = useRef(false)
    const onHeroImgLoad = () => {
        controls.start({
            y: [15, -5, 0],
            opacity: [0, 0.2, 1],
            transition: {duration: 1}
        })
        // controls.start({
        //     transition: {duration: 4},
            
        // })
    }

    const Parent : Variants = {
        hidden: {
            opacity: 0, 
        },
        visible: {
            opacity: [0, 0.2, 1],
            transition: {staggerChildren: 0.5, delayChildren: 2.8},
        }
    }

    const siblingText: Variants = {
        hidden: {
            opacity: 0, 
            // y: 30,
        },
        visible: {
            opacity: 1,
            // y: 0,
            transition: { duration: 0.6}
        }
    }

    return (
        <motion.div className={styles.landingPageBody}>
            <Heading as={motion.h2}
                fontSize="32px" fontWeight="700" borderBottom="1px solid" borderColor="grey.100" textAlign="center" pt="2%" pb="12px" ml = "5%" mr = "5%" 
            >
                BitPayRoll
            </Heading>
            <Container maxW="978px" mt="clamp(3vh, 100px, 8vh)" mb={10} centerContent textAlign="center" px={10}>
                <Flex direction="column" justifyContent="center" as={motion.div} initial="hidden" animate="visible" variants={Parent} gap={{base: 3, md: 6}}>
                    <SlidingText text="Pay your employees in bitcoin with ease" fontSize={{base: "32px", lg: "48px", xl: "56px"}} fontWeight="700" letterSpacing="4px" lineHeight="120%" />
                    <Text as={motion.p} variants={siblingText} fontSize={{base: "20px", md: "30px"}} fontWeight="400">
                        Our payroll platform is designed to help organisations pay employees in bitcoin with ease.
                    </Text>
                    {/* <Text fontSize={{base: "20px", md: "30px"}} fontWeight="400">
                        Our payroll platform is designed to help organisations pay employees in bitcoin with ease.
                    </Text> */}
                    <ButtonGroup mx="auto" as={motion.div} variants={siblingText} gap='4' mt={5}>
                        <Link to="/sign-up">
                            <Button minW={{base: "100px", md: "150px"}} fontSize={{base: "12px", md: "16px"}}>Create Account</Button>
                        </Link>
                        <Link to="/login">
                            <Button minW={{base: "100px", md: "150px"}} fontSize={{base: "12px", md: "16px"}} variant='outlined'>Login</Button>
                        </Link>
                    </ButtonGroup>
                </Flex>

                <div className={styles.heropicture}>
                    <motion.img src={heropicture} alt="heropicture" onLoad={onHeroImgLoad} animate={controls} />
                </div>
            </Container>
        </motion.div>
    )
}

export default Home;