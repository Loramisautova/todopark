import React, { useContext, useState } from 'react';
import { Popover } from 'antd';
import { CalendarItem } from '../CalendarItem';
import { Dayjs } from 'dayjs';
import { MyGlobalContext } from '../../context';
import { TodoItem } from '../../types';

type Props = {
    children: JSX.Element,
    item: TodoItem;
    onCalendarClick: (value: boolean) => void;
}

export const CalendarPopover: React.FC<Props> = ({ children, item, onCalendarClick }) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const { dueDate } = item;

    // todoStore
    const { onEditTodo } = useContext(MyGlobalContext);

    const handleCalendarToggle = (value: boolean) => {
        setIsCalendarOpen(value);
    }

    const handleEditedItem = (value: Dayjs | undefined) => {
        onEditTodo && onEditTodo({
            ...item,
            dueDate: value,
        });
    }

    return (
        <>
            <Popover
                content={(
                    <CalendarItem
                        defaultDate={dueDate}
                        onToggle={handleCalendarToggle}
                        onDueDateSelect={handleEditedItem}
                    />
                )}
                onOpenChange={(open) => {setIsCalendarOpen(open)}}
                open={isCalendarOpen}
                title="Select a due date"
                trigger="click"
            >
                {children}
            </Popover>
        </>
    )
}

