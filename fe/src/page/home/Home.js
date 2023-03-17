import React, { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import bg from '../../asset/bg.png'


export default function Home() {
    return <div className={styles['container']}>
        <div className={styles['horizontal-line']}></div>
        <div className={styles['first-text']}>
            OPEN FOR INDOOR DINING
        </div>
        <div className={styles['second-text']}>please call 415.981.0983 for reservations
            <p className={styles['second-text']}>
                or online through opentable
            </p>
        </div>
        <img className={styles['img']} src={bg} />
        <div className={styles['third-text']}>
            PLEASE SEE OUR PUBLISHED
            <br />
            HEALTH AND SAFETY PROTOCOLS
            <br />
            AND BE AWARE OF LOCAL GUIDELINES
            <br />
            RELATED TO INDOOR DINING AT RESTAURANTS.
        </div>
        <div className={styles['third-text']}>
            KALI OREXI!
        </div>
        <div className={styles['fifth-text']}>
            <div className={styles['fifth-text-item']}>PRESS ROOM</div>
            <div className={styles['fifth-text-item']}>GIFT CERTIFICATES
                <p>
                    & COOKBOOK
                </p>
            </div>
            <div className={styles['fifth-text-item']}>CONTACT</div>
        </div>
        <div className={styles['six-text']}>
            <div>PRESS ROOM</div>
            <div>GIFT CERTIFICATES
                <br />
                & COOKBOOK
            </div>
            <div>CONTACT</div>
        </div>
        <div className={styles['seven-text']}>
            KOKKARI&nbsp;&nbsp;|&nbsp;&nbsp;EVVIA
        </div>
        <div className={styles['seven-text']}>
            KOKKARI ESTIATORIO
            <p>200 Jackson Street (at Front St.)</p>
            <p>San Francisco, CA 94111</p>
            p: 415.981.0983 fx:415.982.0983
        </div>
        <div className={styles['seven-text']}>
            reservations & hours
            <p>directions</p>
        </div>

    </div>

}
