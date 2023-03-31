import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { TodoItem } from '../../types';

dayjs.extend(utc);

export const todayTodoListFilter = (todoList: TodoItem[]) => todoList.filter((curr) => {
        return (
            dayjs().utc().isSame(dayjs(curr.createDate).utc(), 'day') &&
            dayjs().utc().isSame(dayjs(curr.dueDate).utc(), 'day') &&
            curr.isDone !== true &&
            curr.createDate !== undefined
        );
    }
);
