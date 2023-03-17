import React from "react";
import { CaretUpOutlined } from "@ant-design/icons";
import styles from './UpButton.module.scss'

const UpButton = () => {
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return <div className={styles['container']} onClick={scrollToTop}>
        <  CaretUpOutlined />
    </div>
};

export default UpButton;
