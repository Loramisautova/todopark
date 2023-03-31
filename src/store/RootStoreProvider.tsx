import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import React, { PropsWithChildren } from 'react';

import { LOCAL_STORAGE_STORE_KEY } from '../consts/system';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TodoItem, TodoItemFromStorage } from '../types';
import { todoListMapper } from '../utils/mappers/todo-list-mapper';

import { RootStoreContext } from './rootStore';

export const RootStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [todos, setTodos] = useLocalStorage<TodoItemFromStorage[], TodoItem[]>(
        LOCAL_STORAGE_STORE_KEY,
        [],
        todoListMapper,
    );

    const handleItemEdit = (editedItem: TodoItem) => {
        const newTodos = todos.map((item: TodoItem) => (item.id === editedItem.id ? editedItem : item));

        setTodos(newTodos);
    };

    const handleAdd = (item: Omit<TodoItem, 'id'>) => {
        setTodos([
            {
                id: nanoid(),
                createDate: dayjs(),
                isDone: false,
                ...item,
            },
            ...todos,
        ]);
    };

    return (
        <RootStoreContext.Provider
            value={{
                todos: todos,
                onAddTodo: handleAdd,
                onEditTodo: handleItemEdit,
            }}
        >
            {children}
        </RootStoreContext.Provider>
    );
};
