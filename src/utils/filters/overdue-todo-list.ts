import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { TodoItem } from '../../types';

dayjs.extend(utc);

export const overdueTodoListFilter = (todoList: TodoItem[]) => todoList.filter((curr) => {
    return (dayjs().utc().isAfter(dayjs(curr.dueDate).utc(), 'day') && curr.dueDate !== undefined && curr.isDone !== true);
});
