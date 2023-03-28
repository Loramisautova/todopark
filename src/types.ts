import { Dayjs } from 'dayjs';

export type StorageMapper<TStoredData, TInternalData> = {
    to?: (data: TInternalData) => TStoredData;
    from?: (data: TStoredData) => TInternalData;
};

export type TodoItemFromStorage = {
    id: string;
    task: string;
    description?: string;
    dueDate?: number;
    createDate?: number;
    isDone?: boolean;
};

export type TodoItem = {
    id: string;
    task: string;
    description?: string;
    dueDate?: Dayjs;
    createDate?: Dayjs;
    isDone?: boolean;
};
