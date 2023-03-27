import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { useGlobalContext } from '../../context';
import { TodoList } from '../../components/TodoList';

export const InboxPage = () => {
    const { todoStore } = useGlobalContext();

    return (
        <>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Inbox</h1>
            {
                todoStore?.length && <TodoList todos={todoStore} />
            }
        </>

    );
}