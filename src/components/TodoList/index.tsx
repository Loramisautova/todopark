import React, { useState, useEffect, useRef, useCallback } from 'react';
import { List } from 'antd';

import { TodoItemGlobal } from '../../types';
import { TodoItem } from '../TodoItem';

// import styles from './styles.module.scss';

type Props = {
    todos: TodoItemGlobal[] | undefined;
    // onEditTask?: (id: string, newTask: string) => void;
};

export const TodoList: React.FC<Props> = ({ todos}) => {
    const containerRef = useRef(null);
    const firstItemRef = useRef(null);
    // стейт - id редактированного элемента
    const [editItemId, setEditItemId] = useState<string>();

    useEffect(() => {
        let observer: IntersectionObserver;
        const container = containerRef.current;
        const firstElement = firstItemRef.current;

        console.log('##############');
        console.log('container', container);
        console.log('firstElement', firstElement);
        console.log('##############');

        if (container) {
            observer = new IntersectionObserver((entries) => {
                const [ entry ] = entries;

                console.log('##############');
                console.log('entries', entries);
                console.log('entry.isIntersecting', entry.intersectionRatio);
                console.log('##############');

            }, {
                root: container,
                rootMargin: "0px",
                threshold: [1],
            });

            if (firstElement) {
                observer.observe(firstElement);
            }
        }

        return () => {
            if(observer && firstElement) {
                observer.unobserve(firstElement);
            }
        }
    }, [containerRef, firstItemRef])

    const handleItemEditToggle = (id: string) => {
        if (editItemId === id) {
            setEditItemId('');
        } else {
            setEditItemId(id);
        }
    }

    return Boolean(todos?.length)
        ? (
            <div ref={containerRef}>
                <List
                    dataSource={todos}
                    renderItem={(todo, index) => (
                        <div ref={index === 0 ? firstItemRef : undefined}>
                            <TodoItem
                                key={todo.id}
                                item={todo}
                                isEditMode={editItemId === todo.id}
                                onEditToggle={handleItemEditToggle}
                            />
                        </div>
                    )}
                />
            </div>
        )
        : null;
}