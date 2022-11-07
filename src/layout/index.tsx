import { Button } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'
import SideBar from './sideBar'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={styles.layout_container} id='layout-container'>
      <SideBar />
      <main className={styles.main_page}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout