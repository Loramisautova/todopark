import { createContext, useContext } from 'react';
import { TodoItem } from './types';

export type GlobalContent = {
    onEditTodo?: (editedTodo: TodoItem) => void;
    todoStore?: TodoItem[],
}

export const MyGlobalContext = createContext<GlobalContent>({
    onEditTodo: () => {},
    todoStore: [],
});

export const useGlobalContext = () => useContext(MyGlobalContext);