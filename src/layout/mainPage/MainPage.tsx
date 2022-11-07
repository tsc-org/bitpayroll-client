import React from 'react'
import styles from './mainPage.module.scss'

const MainPage = ({children}: {children: React.ReactNode}) => {
  return (
    <section className={styles.main_page_container}>
        {children}
    </section>
  )
}

export default MainPage