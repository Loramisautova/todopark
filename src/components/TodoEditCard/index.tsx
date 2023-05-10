import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';

import { useRootStore } from '../../store/rootStore';
import { TodoItem } from '../../types';

import styles from './styles.module.scss';

const { TextArea } = Input;

type Props = {
    item: TodoItem;
    onEditToggle?: (id: string) => void;
};

export const TodoEditCard: React.FC<Props> = ({ item, onEditToggle }) => {
    const { id, task } = item;

    const { onEditTodo } = useRootStore();
    const [isFocused, setIsFocused] = useState(false);
    const [editedItem, setEditedItem] = useState<TodoItem>(item);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditedItem((prev) => ({
            ...prev,
            description: e.target.value,
        }));
    };

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedItem((prev) => ({
            ...prev,
            task: e.target.value,
        }));
    };

    const handleCancel = () => {
        onEditToggle?.(id);
    };

    const handleSave = () => {
        onEditTodo && onEditTodo(editedItem);

        onEditToggle?.(id);
    };

    return (
        <Form name='basic' style={{ width: '100%' }} initialValues={{ remember: true }} autoComplete='off'>
            <Form.Item
                className={classNames(styles.editor, { [styles.focused]: isFocused })}
                style={{ marginBottom: 10 }}
            >
                <Input
                    className={styles.title}
                    placeholder='Task name'
                    defaultValue={task}
                    onChange={handleTaskChange}
                    onFocus={() => setIsFocused(true)}
                />
                <br />
                <TextArea
                    className={styles.description}
                    placeholder='Description'
                    value={editedItem.description}
                    onChange={handleDescriptionChange}
                    rows={2}
                    onFocus={() => setIsFocused(true)}
                />
            </Form.Item>
            <div className={styles.buttons}>
                <Form.Item>
                    <Button className={styles.editBtn} onClick={handleCancel}>Cancel</Button>
                </Form.Item>
                <Form.Item>
                    <Button className={styles.editBtn} onClick={handleSave} type='primary' disabled={!isFocused}>
                        Save
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};