import { Heading } from '@chakra-ui/react'
import styles from './header.module.scss'
import React from 'react'

const Header = ({header}: {header: React.ReactNode}) => {
  return (
    <section className={styles.header_container}>
        {header}
    </section>
  )
}

export default Header