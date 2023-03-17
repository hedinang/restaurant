import React, { useState } from "react";
import { Button, Col, Drawer, Image, Row } from "antd";
import MiniMenu from "./MiniMenu";
import styles from './nav.module.scss'; // Import css modules stylesheet as styles
import { MenuOutlined } from "@ant-design/icons";

const Navbar = () => {
    const [rightVisible, setRightVisible] = useState(false);
    const [category, setCategory] = useState([
        'ABOUT',
        'CUISINE',
        'MENUS',
        'RESERVATIONS',
        'PRIVATE DINING',
    ])
    const showRightDrawer = () => {
        setRightVisible(!rightVisible);
    };
    return (
        <>
            <div className={styles['nav-container']}>
                <img className={styles.img} src='https://kokkari.com/wp-content/uploads/kokkari-logo-350.png' />
                {/* <div className={styles['nav-header']}> */}
                <ul className={styles['nav-header']}>
                    {category.map(e => {
                        if (e === 'MENUS') {
                            return <li
                            // className={styles['menu']}
                            >{e}
                                <ul className={styles['sub-ul']}>
                                    <li className={styles['sub-li']}>LUNCH MENU</li>
                                    <li className={styles['sub-li']}>DINNER MENU</li>
                                    <li className={styles['sub-li']}>WINE LIST</li>
                                    <li className={styles['sub-li']}>VALENTINES DAY</li>
                                </ul>
                            </li>
                        } else {
                            return <li>{e}</li>
                        }
                    })}
                </ul>
                <Button className={styles['drawer-button']} type="text"
                    onClick={showRightDrawer}
                >
                    <MenuOutlined width={100} />
                </Button>
            </div>
            <Drawer
                width={320}
                closable={false}
                onClose={showRightDrawer}
                open={rightVisible}
            >
                <MiniMenu mode={"inline"} />
            </Drawer>
        </>
    );
};

export default Navbar;
