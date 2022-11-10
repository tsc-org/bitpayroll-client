import React from 'react'
import { Link } from "react-router-dom";
import '../../App.css'
import styles from './home.module.scss'
import heropicture from "../../assets/landingpage-group.png"
import { Button, ButtonGroup } from '@chakra-ui/react'


const Home = () => {
    return (
        <div className={styles.landingPageBody}>
            <div>
                <h1>BitPayRoll</h1>
            </div>
            <div className={styles.heroText}>
                <h1>Pay your employees in bitcoin with ease</h1>
                <p>Our payroll platform is designed to help organisations pay employees in bitcoin with ease.</p>
                <div className={styles.buttons}>
                    <ButtonGroup gap='4'>
                        <Button >Create Account</Button>
                        <Button variant='outlined'>Login</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className={styles.heropicture}>
                <img src={heropicture} alt="heropicture" />
            </div>
        </div>
    )
}

export default Home;