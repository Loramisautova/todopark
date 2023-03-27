import React, { useCallback, useEffect, useState } from 'react';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import { useOutletContext } from "react-router-dom";

import { TodoList } from '../../components/TodoList';
import { formatToday } from '../../utils/dates';

import { TodoItemGlobal } from '../../types';
import { useGlobalContext } from '../../context';

import styles from './styles.module.scss';
import { useInView } from 'react-intersection-observer';

// type ContextType = {
//     inView: boolean | null;
// }
export const MainPage: React.FC = () => {
    const { todoStore } = useGlobalContext();
    // const { inView } = useOutletContext<ContextType>();

    // console.log('##############');
    // console.log('inView', inView);
    // console.log('##############');

    const [height, setHeight] = useState(0);

    const measuredRef = useCallback((node: HTMLDivElement) => {

        console.log('##############');
        console.log('node', node);
        console.log('##############');

        if (node !== null) {
            setHeight(window.pageYOffset + node.getBoundingClientRect().top);
        }
    }, []);

    console.log('##############');
    console.log('height', height);
    console.log('##############');

    useEffect(() => {

    })

    const overdueTodos = todoStore?.reduce((acc: TodoItemGlobal[], curr: TodoItemGlobal) => {
        if (
            dayjs().isAfter(dayjs(curr.dueDate), 'day') &&
            curr.dueDate !== undefined
        ) {
            acc.push(curr);
        }
        return acc;
    }, []);


    const todayTodos = React.useMemo<TodoItemGlobal[] | undefined>(() => {
        return todoStore?.reduce((acc: TodoItemGlobal[], curr: TodoItemGlobal) => {
            if (
                dayjs().isSame(dayjs(curr.createDate), 'day') &&
                dayjs().isSame(dayjs(curr.dueDate), 'day')  &&
                curr.createDate !== undefined
            ) {
                acc.push(curr);
            }
            return acc;
        }, []);
    }, [todoStore]);

    const { ref, inView } = useInView({
        threshold: 0
    });

    return (
        <div>
            <div className={styles.header}>
                    <Typography.Title level={3} style={{ margin: 0 }}>Today</Typography.Title>
                    <Typography.Text className={styles.subTitle}>
                        {dayjs(`${dayjs().day()}`).format('ddd')} {formatToday()}
                    </Typography.Text>
            </div>
            {
                Boolean(overdueTodos?.length) &&
                    <div ref={ref}>
                        {/*<h2>{`Header inside viewport ${inView}.`}</h2>*/}
                        <h5 className={styles.title} ref={measuredRef}>Overdue</h5>
                        <TodoList todos={overdueTodos} />
                    </div>
            }
            {
                Boolean(todayTodos?.length) &&
                    <>
                        <h5 className={styles.title}>{formatToday()}  &#x2022; Today &#x2022; {dayjs(`${dayjs().day()}`).format('dddd')}</h5>
                        <TodoList todos={todayTodos} />
                    </>
            }
        </div>
    );
}