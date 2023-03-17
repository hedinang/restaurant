import React from 'react';
import styles from './Footer.module.scss'
export const Footer = () => {
    return <div className={styles['container']}>
        <div className={styles['item']}>© 2015-2023 Kokkari</div>
        <div className={styles['item']}>Photos by Sara Remington | Site by TenayaPartners</div>
    </div>
}