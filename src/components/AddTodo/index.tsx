import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { TodoItemGlobal } from '../../types';
import styles from './styles.module.scss';

const { TextArea } = Input;

type Props = {
    onAdd: (item: Omit<TodoItemGlobal, 'id'>) => void;
};

export const AddTodo: React.FC<Props> = ( { onAdd }) => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onAdd({task, description});

        setTask('');
        setDescription('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);

        setTask('');
        setDescription('');
    };

    return (
        <>
            <Button type="primary" className={styles.edit} onClick={showModal} icon={<PlusOutlined style={{ fontSize: '16px' }} />} />
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                okText={"Add task"}
                okButtonProps={{ disabled: !Boolean(task) }}
                onCancel={handleCancel}
                maskClosable={false}
                closable={false}
            >
                <Input placeholder="Task name" value={task} className={styles.title} onChange={handleTextChange} />
                <br />
                <TextArea placeholder="Description" value={description} rows={4} onChange={handleDescriptionChange}/>
            </Modal>
        </>
    );
}