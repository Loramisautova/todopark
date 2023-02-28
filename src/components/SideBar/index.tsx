import React from "react";
import { Layout, Menu } from 'antd';
import { ScheduleOutlined, InboxOutlined, CarryOutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

import styles from './styles.module.scss';

const { Sider } = Layout;

const item = [
    {
        label: 'Inbox',
        icon: InboxOutlined,
    },
    {
        label: 'Today',
        icon: CarryOutOutlined,
    },
    {
        label: 'Upcoming',
        icon: ScheduleOutlined,
    },
]

const items2: MenuProps['items'] = item.map(
    (item, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(item.icon),
            label: item.label,
        };
    },
);

type Props = {
    onCollapsed: boolean;
}

export const SideBar: React.FC<Props> = ({ onCollapsed }) => {

    return (
        <Sider
            width={305}
            breakpoint={"lg"}
            collapsedWidth={0}
            collapsible
            collapsed={onCollapsed}
            trigger={null}
        >
            <Menu
                className={styles.content}
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items2}
            />
        </Sider>
    );
};
