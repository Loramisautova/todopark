import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import React, { useState, useContext } from 'react';

import { MyGlobalContext } from '../../context';
import { TodoItemGlobal } from '../../types';

import styles from './styles.module.scss';

const { TextArea } = Input;

type Props = {
    item: TodoItemGlobal;
    onEditToggle?: (id: string) => void;
};

export const EditItem: React.FC<Props> = ({ item, onEditToggle }) => {
    const { onEditTodo } = useContext(MyGlobalContext);
    const [isFocused, setIsFocused] = useState(false);

    const { id, task } = item;

    const [editedItem, setEditedItem] = useState<TodoItemGlobal>(item);

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
                    placeholder='Description'
                    value={editedItem.description}
                    onChange={handleDescriptionChange}
                    rows={2}
                    onFocus={() => setIsFocused(true)}
                />
            </Form.Item>
            <div className={styles.buttons}>
                <Form.Item>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={handleSave} type='primary' disabled={!editedItem.task}>
                        Save
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};
