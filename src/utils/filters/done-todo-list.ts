import { TodoItem } from '../../types';

export const doneTodoListFilter = (todoList: TodoItem[]) => todoList.reduce(
    (acc: TodoItem[], curr: TodoItem) => {
        if (curr.isDone === true) {
            acc.push(curr);
        }
        return acc;
    },
    [],
);