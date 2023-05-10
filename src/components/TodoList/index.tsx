import { List } from 'antd';
import React, { useState } from 'react';

import { TodoItem as TTodoItem } from '../../types';
import { TodoItem } from '../TodoItem';

type Props = {
    todos: TTodoItem[];
    onItemClick?: (id: string) => void;
    // onEditTask?: (id: string, newTask: string) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onItemClick }) => {
    // Id редактируемого элемента
    const [editItemId, setEditItemId] = useState<string>();

    const handleItemEditToggle = (id: string) => {
        if (editItemId === id) {
            setEditItemId('');
        } else {
            setEditItemId(id);
        }
    };

    return todos?.length ? (
        <List
            dataSource={todos}
            renderItem={(todo) => (
                <TodoItem
                    key={todo.id}
                    item={todo}
                    isEditMode={editItemId === todo.id}
                    onClick={onItemClick}
                    onEditToggle={handleItemEditToggle}
                />
            )}
        />
    ) : null;
};
