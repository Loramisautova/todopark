import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { TodoItem } from '../../types';

dayjs.extend(utc);

export const overdueTodoListFilter = (todoList: TodoItem[]) => todoList.reduce(
    (acc: TodoItem[], curr: TodoItem) => {
        if (dayjs().utc().isAfter(dayjs(curr.dueDate).utc(), 'day') && curr.dueDate !== undefined) {
            acc.push(curr);
        }
        return acc;
    },
    [],
);
