import styles from './header.module.scss'
import React from 'react'

interface HeaderProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({header, children}) => {
  return (
    <section className={styles.header_container}>
      <div className={styles.header_main_content} >
        {header? header : null}
        {children}
      </div>
      <div className={styles.hidden_right_space}></div>
    </section>
  )
}

export default Header