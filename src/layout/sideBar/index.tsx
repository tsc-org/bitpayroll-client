import { Box, Heading, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import styles from './sidebar.module.scss'
import { MdOutlineEdit } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'
import { MdOutlineGroupAdd } from 'react-icons/md'
import {IoSettingsOutline} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'


import dashboardIcon from "../../assets/icons/dashboardIcon.svg"
import groupAddIcon from "../../assets/icons/groupAddIcon.svg"
import walletIcon from "../../assets/icons/walletIcon.svg"
import bitcoinIcon from "../../assets/icons/bitcoinIcon.svg"
import rcodeIcon from "../../assets/icons/123Icon.svg"
import changeCircleIcon from "../../assets/icons/changeCircleIcon.svg"
// import editIcon from "../../assets/icons/editIcon.svg"

const links = [
    {title: 'Dashboard', to: '/dashboard', icon: dashboardIcon},
    {title: 'Registered Employee', to: '/employees', icon: groupAddIcon},
    {title: 'Create Wallet', to: '/create-wallet', icon: walletIcon},
    {title: 'Send Payment', to: '/send', icon: bitcoinIcon},
    {title: 'Generate R-Code', to: '/generate', icon: rcodeIcon},
    {title: 'Set Payday Circles', to: '/payday-circles', icon: changeCircleIcon},
]

const SideBar = () => {
  return (
    <section className={styles.sidebar_container}>
        <header>
            <Heading fontWeight='medium' fontSize={['lg', 'xl', '2xl']} >BitPayRoll</Heading>
        </header>
        <div className={styles.org_info}>
            <div className={styles.img_container}></div>
            <Box mt='4' mb='8'>
               <Heading fontSize='lg' fontWeight='medium' pb='2'>
                Aria Tech
                </Heading> 
               <Text fontWeight='normal' fontSize='sm'>Administrator</Text>
            </Box>
            <div className={styles.profile_cta}>
                <IconButton size='icon' variant={'profileIcon'} icon={<MdOutlineEdit/>} aria-label='edit' />
                <IconButton size='icon' variant={'profileIcon'} icon={<IoSettingsOutline/>} aria-label='settings' />
                <IconButton size='icon' variant={'profileIcon'} icon={<MdOutlineGroupAdd/>} aria-label='add' />
                <IconButton size='icon' variant={'profileIcon'} icon={<MdLogout/>} aria-label='logout' />
            </div>
        </div>
        <div className={styles.nav_links}>
            <Text py='6' fontWeight={'medium'} fontSize='sm' color='grey.175'>MAIN</Text>
            <nav>
                <ul>
                    {links.map((link, idx) => (
                        <li key={idx}>
                            <NavLink to={link.to}
                                className={({isActive}) => isActive ? styles.activeLink : styles.inActive}
                            >
                                <div>
                                    <img src={link.icon} alt={link.title} />
                                    <p>{link.title}</p>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </section>
  )
}

export default SideBar