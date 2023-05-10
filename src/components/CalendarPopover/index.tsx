import { Popover } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { useRootStore } from '../../store/rootStore';
import { TodoItem } from '../../types';
import { CalendarItem } from '../CalendarItem';

type Props = {
    children: JSX.Element;
    item: TodoItem;
};

export const CalendarPopover: React.FC<Props> = ({ children, item }) => {
    const { dueDate } = item;

    const { onEditTodo } = useRootStore();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const handleCalendarToggle = (value: boolean) => {
        setIsCalendarOpen(value);
    };

    const handleOpenChange = (open: boolean) => {
        setIsCalendarOpen(open);
    }

    const handleEditedItem = (value: Dayjs | undefined) => {
        onEditTodo &&
            onEditTodo({
                ...item,
                dueDate: value,
            });
    };

    return (
        <>
            <Popover
                content={
                    <CalendarItem
                        defaultDate={dueDate}
                        onToggle={handleCalendarToggle}
                        onDueDateSelect={handleEditedItem}
                    />
                }
                onOpenChange={(open) => {
                    handleOpenChange(open);
                }}
                open={isCalendarOpen}
                title='Select a due date'
                trigger='click'
            >
                {children}
            </Popover>
        </>
    );
};
