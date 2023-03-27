import { Dayjs } from 'dayjs';

export type StorageMappers<TStoredData, TInternalData> = {
    to?: (data: TInternalData) => TStoredData,
    from?: (data: TStoredData) => TInternalData,
};

export type TodoItemFromStorage = {
    id: string,
    task: string,
    description?: string,
    dueDate?: number,
    createDate?: number,
    isChecked?: boolean,
}

export type TodoItemGlobal = {
    id: string,
    task: string,
    description?: string,
    dueDate?: Dayjs,
    createDate?: Dayjs,
    isChecked?: boolean,
}