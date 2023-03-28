import { CarryOutOutlined, InboxOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '../../router/routes';

import styles from './styles.module.scss';

const menuItems = [
    {
        key: APP_ROUTES.inbox.path,
        icon: <InboxOutlined />,
        label: <Link to={APP_ROUTES.inbox.path}>Inbox</Link>,
    },
    {
        key: APP_ROUTES.default.path,
        icon: <CarryOutOutlined />,
        label: <Link to={APP_ROUTES.default.path}>Today</Link>,
    },
    {
        key: APP_ROUTES.upcoming.path,
        icon: <ScheduleOutlined />,
        label: <Link to={APP_ROUTES.upcoming.path}>Upcoming</Link>,
    },
];

type Props = {
    collapsed: boolean;
};

export const SideBar: React.FC<Props> = ({ collapsed }) => (
    <Layout.Sider
        width={305}
        breakpoint={'lg'}
        collapsedWidth={0}
        collapsed={collapsed}
        trigger={null}
        collapsible
    >
        <Menu
            style={{ height: '100%', borderRight: 0 }}
            className={styles.content}
            mode='inline'
            items={menuItems}
            defaultSelectedKeys={[menuItems[1].key]}
        />
    </Layout.Sider>
);
