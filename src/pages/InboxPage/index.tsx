import React from 'react';

import { TodoList } from '../../components/TodoList';
import { useRootStore } from '../../store/rootStore';

export const InboxPage = () => {
    const { todos } = useRootStore();

    return (
        <>
            <h1 style={{ fontSize: 20, fontWeight: 700 }}>Inbox</h1>
            {todos?.length && <TodoList todos={todos} />}
        </>
    );
};
