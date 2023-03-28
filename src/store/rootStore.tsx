import { createContext, useContext } from 'react';

import { TodoItem } from '../types';

export type RootStoreState = {
    // Data
    todos: TodoItem[] | null;
    // Actions
    onAddTodo: (newTodo: Omit<TodoItem, 'id'>) => void;
    onEditTodo: (editedTodo: TodoItem) => void;
};

export const RootStoreContext = createContext<RootStoreState>({
    todos: [],
    onAddTodo: () => null,
    onEditTodo: () => null,
});

export const useRootStore = () => useContext(RootStoreContext);
