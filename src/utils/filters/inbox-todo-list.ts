import { TodoItem } from '../../types';

export const inboxTodoListFilter = (todoList: TodoItem[]) => todoList.filter((curr: TodoItem) => curr.isDone !== true);