import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { StorageMapper, TodoItem, TodoItemFromStorage } from '../../types';

dayjs.extend(utc);

export const todoListMapper: StorageMapper<TodoItemFromStorage[], TodoItem[]> = {
    to: (data) =>
        data?.map((item) => ({
            ...item,
            dueDate: item.dueDate?.utc().unix(),
            createDate: item.createDate?.utc().unix(),
        })),
    from: (data) =>
        data?.map((item) => ({
            ...item,
            dueDate: item.dueDate ? dayjs(item.dueDate * 1000) : undefined,
            createDate: item.createDate ? dayjs(item.createDate * 1000) : undefined,
        })),
};
