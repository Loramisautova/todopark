import React from 'react';

import { TodoList } from '../../components/TodoList';
import { useGlobalContext } from '../../context';

export const InboxPage = () => {
    const { todoStore } = useGlobalContext();

    return (
        <>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Inbox</h1>
            {todoStore?.length && <TodoList todos={todoStore} />}
        </>
    );
};
