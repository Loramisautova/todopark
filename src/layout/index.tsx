import { HomeOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AddTodo } from '../components/AddTodo';
import { SideBar } from '../components/SideBar';
import { useGlobalContext } from '../context';

import styles from './styles.module.scss';

const { Header, Footer, Content } = Layout;

export const TodoLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const ref = useRef(null);
    const { onAddTodo } = useGlobalContext();

    // const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });

    // const { ref, inView } = useInView({
    //     threshold: 1,
    // });

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    console.log('##############');
    console.log('scrollPosition', scrollPosition);
    console.log('##############');

    const handleOnMenuClick = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Header className={styles.header} style={{ height: '43px', background: '#db4c3f' }}>
                <Menu className={styles.menu} theme='dark' mode='horizontal' style={{ height: '43px' }}>
                    <Menu.Item className={styles.item} key='1'>
                        <Button
                            type='primary'
                            onClick={handleOnMenuClick}
                            icon={<MenuOutlined style={{ fontSize: '16px' }} />}
                        />
                        <Button type='primary' icon={<HomeOutlined style={{ fontSize: '16px' }} />} />
                    </Menu.Item>
                    <Menu.Item className={styles.item} key='2'>
                        <AddTodo onAdd={onAddTodo} />
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <SideBar onCollapsed={collapsed} />
                <Content ref={ref} style={{ padding: '0 50px' }}>
                    <div className={styles.layout}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Todopark ©2023 Created by Lora Misautova</Footer>
        </>
    );
};
