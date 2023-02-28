import { StorageMappers, TodoItem, TodoItemFromStorage } from '../../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const todoListMappers: StorageMappers<TodoItemFromStorage[], TodoItem[]> = {
    to: (data) => data?.map((item) => ({
        ...item,
        dueDate: item.dueDate?.utc().unix(),
    })),
    from: (data) => data?.map((item) => ({
        ...item,
        dueDate: item.dueDate ? dayjs(item.dueDate * 1000) : undefined,
    })),
};