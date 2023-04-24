import { Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';

import { TodoList } from '../../components/TodoList';
import { useRootStore } from '../../store/rootStore';
import { formatToday } from '../../utils/dates';
import { overdueTodoListFilter } from '../../utils/filters/overdue-todo-list';
import { todayTodoListFilter } from '../../utils/filters/today-todo-list';

import styles from './styles.module.scss';

export const MainPage: React.FC = () => {
    const { todos } = useRootStore();

    const [modalVisible, setModalVisible] = useState(false);

    const handleModalCancel = () => {
        setModalVisible(false);
    }

    const todaySubTitle = useMemo(
        () => `${dayjs(`${dayjs().day()}`).format('ddd')} ${formatToday()}`,
        [],
    );
    const todayTodoListTitle = useMemo(
        () => `${formatToday()} • Today • ${dayjs(`${dayjs().day()}`).format('dddd')}`,
        [],
    );
    const overdueTodos = useMemo(() => overdueTodoListFilter(todos || []), [todos]);
    const todayTodos = useMemo(() => todayTodoListFilter(todos || []), [todos]);

    return (
        <div>
            <div className={styles.header}>
                <Typography.Title level={3} style={{ margin: 0 }}>
                    Today
                </Typography.Title>
                <Typography.Text className={styles.subTitle}>
                    {todaySubTitle}
                </Typography.Text>
            </div>
            {Boolean(overdueTodos?.length) && (
                <div>
                    <Typography.Title className={styles.title} level={5}>
                        Overdue
                    </Typography.Title>
                    <TodoList todos={overdueTodos} />
                </div>
            )}
            {Boolean(todayTodos?.length) && (
                <>
                    <Typography.Title className={styles.title} level={5}>
                        {todayTodoListTitle}
                    </Typography.Title>
                    <TodoList todos={todayTodos} />
                </>
            )}
        </div>
    );
};
