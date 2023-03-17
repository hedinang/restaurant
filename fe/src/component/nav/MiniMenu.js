import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined, ProjectOutlined, HomeOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: 'ABOUT',
        key: 'about',
        // icon: <HomeOutlined />,
    },
    {
        label: 'CUISINE',
        key: 'cuisine',
        // icon: <HomeOutlined />,
    },
    {
        label: 'MENUS',
        key: 'menus',
        // icon: <SettingOutlined />,
        children: [
            {
                label: 'LUNCH MENU',
                key: 'lunch',
            },
            {
                label: 'DINNER MENU',
                key: 'dinner',
            },
            {
                label: 'WINE LIST',
                key: 'wine',
            },
            {
                label: 'VALENTINES DAY',
                key: 'valentine',
            },
        ]
    },
    {
        label: 'RESERVATION',
        key: 'reservation',
        // icon: <SettingOutlined />,
    },
    {
        label: 'PRIVATE DINNING',
        key: 'private',
        // icon: <ProjectOutlined />
    },
];
const MiniMenu = ({ mode }) => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu style={{ backgroundColor: '#6d4318', color: 'white' }} onClick={onClick} selectedKeys={[current]} mode={mode} items={items} />;
};
export default MiniMenu;
