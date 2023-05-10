import { Typography } from 'antd';
import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import { TodoList } from '../../components/TodoList';
import { useTodoModal } from '../../hooks/useTodoModal';
import { APP_ROUTES } from '../../router/routes';
import { useRootStore } from '../../store/rootStore';
import { doneTodoListFilter } from '../../utils/filters/done-todo-list';
import { inboxTodoListFilter } from '../../utils/filters/inbox-todo-list';

import styles from './styles.module.scss';

export const InboxPage = () => {
    const { todos } = useRootStore();
    const [openFn] = useTodoModal(APP_ROUTES.inbox.todo.path);

    const doneTodos = useMemo(() => doneTodoListFilter(todos || []), [todos]);
    const inboxTodos = useMemo(() => inboxTodoListFilter(todos || []), [todos]);

    return (
        <>
            <Outlet />
            <Typography.Title className={styles.header} level={3} style={{ fontSize: 20, fontWeight: 700 }}>
                Inbox
            </Typography.Title>
            {Boolean(inboxTodos?.length) && <TodoList todos={inboxTodos} onItemClick={openFn} />}
            {Boolean(doneTodos?.length) && <TodoList todos={doneTodos} onItemClick={openFn} />}
        </>
    );
};
