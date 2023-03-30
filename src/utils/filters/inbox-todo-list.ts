import { TodoItem } from '../../types';

export const inboxTodoListFilter = (todoList: TodoItem[]) => todoList.reduce(
    (acc: TodoItem[], curr: TodoItem) => {
        if (curr.isDone !== true) {
            acc.push(curr);
        }
        return acc;
    },
    [],
);