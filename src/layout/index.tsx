import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AddTodo } from '../components/AddTodo';
import { SideBar } from '../components/SideBar';
import { useRootStore } from '../store/rootStore';

import styles from './styles.module.scss';

export const TodoLayout: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const { onAddTodo } = useRootStore();

    const handleOnMenuClick = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <>
            <Layout.Header className={styles.header} style={{ height: '43px', background: '#db4c3f' }}>
                <Menu className={styles.menu} theme='dark' mode='horizontal' style={{ height: '43px' }}>
                    <Menu.Item className={styles.item} key='1'>
                        <Button
                            type='primary'
                            onClick={handleOnMenuClick}
                            icon={<MenuOutlined style={{ fontSize: '16px' }} />}
                        />
                        <Button
                            type='primary'
                            icon={<HomeOutlined style={{ fontSize: '16px' }} />}
                        />
                    </Menu.Item>
                    <Menu.Item className={styles.item} key='2'>
                        <AddTodo onAdd={onAddTodo} />
                    </Menu.Item>
                </Menu>
            </Layout.Header>
            <Layout>
                <SideBar collapsed={sidebarCollapsed} />
                <Layout.Content style={{ padding: '0 50px' }}>
                    <div className={styles.layout}>
                        <Outlet />
                    </div>
                </Layout.Content>
            </Layout>
            <Layout.Footer style={{ textAlign: 'center' }}>
                TodoPark ©2023 Created with ❤️ by Lora Misautova
            </Layout.Footer>
        </>
    );
};
