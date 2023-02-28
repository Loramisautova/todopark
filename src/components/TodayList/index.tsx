import React, { useState } from 'react';
import { List } from 'antd';
import dayjs from 'dayjs';

import { TodoItem } from '../../types';
import { TodayItem } from '../TodayItem';
import { formatToday } from '../../utils/dates';

// import styles from './styles.module.scss';

type Props = {
    todos: TodoItem[];
    // onEditTask?: (id: string, newTask: string) => void;
};

export const TodayList: React.FC<Props> = ({ todos}) => {
    // стейт - id редактированного элемента
    const [editItemId, setEditItemId] = useState<string>();

    const handleItemEditToggle = (id: string) => {
        if (editItemId === id) {
            setEditItemId('');
        } else {
            setEditItemId(id);
        }
    }

    return (
        <>
            <List
                header={<h5>{formatToday()}  &#x2022; Today &#x2022; {dayjs(`${dayjs().day()}`).format('dddd')}</h5>}
                dataSource={todos}
                renderItem={(todo) => (
                    !todo.isChecked &&
                    <TodayItem
                        key={todo.id}
                        item={todo}
                        isEditMode={editItemId === todo.id}
                        onEditToggle={handleItemEditToggle}
                    />
                )}
            />
        </>
    );
}