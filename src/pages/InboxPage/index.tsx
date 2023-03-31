import { Typography } from 'antd';
import React, { useMemo } from 'react';

import { TodoList } from '../../components/TodoList';
import { useRootStore } from '../../store/rootStore';
import { doneTodoListFilter } from '../../utils/filters/done-todo-list';
import { inboxTodoListFilter } from '../../utils/filters/inbox-todo-list';

import styles from './styles.module.scss';

export const InboxPage = () => {
    const { todos } = useRootStore();

    const doneTodos = useMemo(() => doneTodoListFilter(todos || []), [todos]);
    const inboxTodos = useMemo(() => inboxTodoListFilter(todos || []), [todos]);

    return (
        <>
            <Typography.Title className={styles.header} level={3} style={{ fontSize: 20, fontWeight: 700 }}>
                Inbox
            </Typography.Title>
            {inboxTodos?.length && <TodoList todos={inboxTodos} />}
            {doneTodos?.length && <TodoList todos={doneTodos} />}
        </>
    );
};
