import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined, ProjectOutlined, HomeOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";
const items = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />,
    },
    // {
    //     label: 'Introduce',
    //     key: 'introduce',
    //     icon: <SettingOutlined />,
    //     children: [
    //         {
    //             label: 'About us',
    //             key: 'aboutUs',
    //             icon: <AppstoreOutlined />
    //         },
    //         {
    //             label: 'History of development',
    //             key: 'historyDevelopment',
    //             icon: <SettingOutlined />
    //         }
    //     ]
    // },
    {
        label: 'Service',
        key: 'service',
        icon: <SettingOutlined />,
        children: [
            {
                label: 'Business website',
                key: 'businessWebsite',
                icon: <AppstoreOutlined />
            },
            {
                label: 'Software outsourcing',
                key: 'softwareOutsourcing',
                icon: <SettingOutlined />
            }
        ]
    },
    {
        label: 'Project',
        key: 'project',
        icon: <ProjectOutlined />
    },
    {
        label: 'News',
        key: 'news',
        icon: <NotificationOutlined />,
        children: [
            {
                label: 'Internal news',
                key: 'internalNews',
                icon: <AppstoreOutlined />
            },
            {
                label: 'Technology news',
                key: 'technologyNews',
                icon: <SettingOutlined />
            },
            {
                label: 'Career',
                key: 'career',
                icon: <SettingOutlined />
            }
        ]
    },
    {
        label: 'Contact',
        key: 'contact',
        icon: <MailOutlined />,
        children: [
            {
                // type: 'group',
                label: 'About us',
                key: 'aboutUs',
                icon: <AppstoreOutlined />
                // children: [
                //     {
                //         label: 'Option 1',
                //         key: 'setting:1',
                //     },
                //     {
                //         label: 'Option 2',
                //         key: 'setting:2',
                //     }
                // ]
            },
            {
                label: 'History of development',
                key: 'historyDevelopment',
                icon: <SettingOutlined />
            }
        ]
    }

];
const LeftHorizontalMenu = ({ mode }) => {
    // const [current, setCurrent] = useState('project');
    const navigate = useNavigate()
    const onClick = (e) => {
        // setCurrent(e.key);
        navigate(e.key)
    };
    return <Menu style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }} className="left-horizontal-menu" onClick={onClick}
        // selectedKeys={[current]} 
        mode={mode} items={items} />;
};
export default LeftHorizontalMenu;
