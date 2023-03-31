import { TodoItem } from '../../types';

export const doneTodoListFilter = (todoList: TodoItem[]) => todoList.filter((curr: TodoItem) => curr.isDone === true);