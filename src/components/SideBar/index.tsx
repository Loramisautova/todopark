import { ScheduleOutlined, InboxOutlined, CarryOutOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { APP_ROUTES } from '../../router/routes';

import styles from './styles.module.scss';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
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
    onCollapsed: boolean;
};

export const SideBar: React.FC<Props> = ({ onCollapsed }) => {
    const onClick: MenuProps['onClick'] = ({ key }) => {
        console.log('click ', key);
    };

    return (
        <Sider width={305} breakpoint={'lg'} collapsedWidth={0} collapsible collapsed={onCollapsed} trigger={null}>
            <Menu
                className={styles.content}
                mode='inline'
                defaultSelectedKeys={['2']}
                style={{ height: '100%', borderRight: 0 }}
                items={menuItems}
                onClick={onClick}
            />
        </Sider>
    );
};
