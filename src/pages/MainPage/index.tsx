import React, { useContext } from 'react';
import { Layout } from 'antd';

import { TodayList } from '../../components/TodayList';

import { TodoLayout } from '../../layout';
import { MyGlobalContext } from '../../context';

import styles from './styles.module.scss';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    const { todoStore } = useContext(MyGlobalContext);

    console.log('##############');
    console.log('todoStore', todoStore);
    console.log('##############');

    return (
        <TodoLayout>
            <Content style={{ padding: '0 50px' }}>
                <div className={styles.layout} style={{ padding: 50, maxWidth: 910, minHeight: 270 }}>
                    {
                        todoStore?.length &&
                        <TodayList todos={todoStore} />
                    }
                </div>
            </Content>
        </TodoLayout>
    );
}