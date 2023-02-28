import React, { useState } from 'react';
import { nanoid } from 'nanoid'
import { Button, Layout, Menu } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';

import { todoListMappers } from '../utils/domain/mappers';

import { useLocalStorage } from '../hooks/useLocalStorage';
import { AddTodo } from '../components/AddTodo';
import { SideBar } from '../components/SideBar';

import { TodoItem, TodoItemFromStorage } from '../types';
import { MyGlobalContext } from '../context';

import styles from './styles.module.scss';

const { Header, Footer } = Layout;

type Props = {
    children: JSX.Element,
}

export const TodoLayout: React.FC<Props> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);

    const [todos, setTodos] = useLocalStorage<TodoItemFromStorage[], TodoItem[]>(
        'todos',
        [],
        todoListMappers,
    );

    console.log('##############');
    console.log('todos', todos);
    console.log('##############');

    const handleItemEdit = (editedItem: TodoItem) => {
        const newTodos = todos.map((item: TodoItem) => item.id === editedItem.id ? editedItem : item);

        setTodos(newTodos);
    }

    const handleAdd = (item: Omit<TodoItem, 'id'>) => {
        setTodos([
            {
                id: nanoid(),
                ...item,
            },
            ...todos,
        ]);
    }

    return (
        <>
            <Header className={styles.header} style={{ height: '43px', background: '#db4c3f' }}>
                <Menu
                    className={styles.menu}
                    theme="dark"
                    mode="horizontal"
                    style={{ height: '43px' }}
                >
                    <Menu.Item className={styles.item} key="1">
                        <Button type="primary" onClick={() => setCollapsed(!collapsed)} icon={<MenuOutlined style={{ fontSize: '16px' }} />} />
                        <Button type="primary" icon={<HomeOutlined style={{ fontSize: '16px' }} />} />
                    </Menu.Item>
                    <Menu.Item className={styles.item} key="2">
                        <AddTodo onAdd={handleAdd} />
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout className={styles.trigger}>
                <SideBar onCollapsed={collapsed} />
                <MyGlobalContext.Provider value={{
                    onEditTodo: handleItemEdit,
                    todoStore: todos,
                }}>
                    {children}
                </MyGlobalContext.Provider>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Todopark ©2023 Created by Lora Misautova</Footer>
        </>
    );
}