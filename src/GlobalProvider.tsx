import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, { PropsWithChildren } from 'react';

import { MyGlobalContext } from './context';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoItemGlobal, TodoItemFromStorage } from './types';
import { todoListMappers } from './utils/domain/mappers';

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [todos, setTodos] = useLocalStorage<TodoItemFromStorage[], TodoItemGlobal[]>('todos', [], todoListMappers);

    console.log('##############');
    console.log('todos', todos);
    console.log('##############');

    const handleItemEdit = (editedItem: TodoItemGlobal) => {
        const newTodos = todos.map((item: TodoItemGlobal) => (item.id === editedItem.id ? editedItem : item));

        setTodos(newTodos);
    };

    const handleAdd = (item: Omit<TodoItemGlobal, 'id'>) => {
        setTodos([
            {
                id: nanoid(),
                createDate: dayjs(),
                ...item,
            },
            ...todos,
        ]);
    };

    return (
        <MyGlobalContext.Provider
            value={{
                onEditTodo: handleItemEdit,
                onAddTodo: handleAdd,
                todoStore: todos,
            }}
        >
            {children}
        </MyGlobalContext.Provider>
    );
};
