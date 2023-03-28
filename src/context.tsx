import { createContext, useContext } from 'react';

import { TodoItemGlobal } from './types';

export type GlobalContent = {
    onEditTodo: (editedTodo: TodoItemGlobal) => void;
    onAddTodo: (newTodo: Omit<TodoItemGlobal, 'id'>) => void;
    todoStore: TodoItemGlobal[] | null;
};

export const MyGlobalContext = createContext<GlobalContent>({
    onEditTodo: () => null,
    onAddTodo: () => null,
    todoStore: [],
});

export const useGlobalContext = () => useContext(MyGlobalContext);
