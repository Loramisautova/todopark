import { CheckOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { List, Typography, Button } from 'antd';
import classNames from 'classnames';
import React, { useContext } from 'react';

import { DATE_SHORT_REVERTED_FORMAT } from '../../consts/formats';
import { MyGlobalContext } from '../../context';
import { TodoItemGlobal } from '../../types';
import { formatDate } from '../../utils/dates';
import { CalendarPopover } from '../CalendarPopover';
import { EditItem } from '../EditItem';

import styles from './styles.module.scss';

type Props = {
    item: TodoItemGlobal;
    isEditMode?: boolean;
    onEditToggle?: (id: string) => void;
    onCalendarClick?: (value: boolean) => void;
};

/**
 * @DEPRECATED
 */
export const TodoItem: React.FC<Props> = ({ item, isEditMode, onEditToggle }) => {
    const { id, task, dueDate } = item;
    const { onEditTodo } = useContext(MyGlobalContext);

    const handleEdit = () => {
        // передаем id редактированного элемента
        onEditToggle?.(id);
    };

    const handleCalendarClick = (value: boolean) => {
        return value;
    };

    const handleCheckClick = () => {
        onEditTodo &&
            onEditTodo({
                ...item,
                isChecked: true,
            });
    };

    return (
        <>
            {!isEditMode && (
                <List.Item className={styles.item}>
                    <div className={styles.circle} onClick={handleCheckClick}>
                        <CheckOutlined className={styles.check} style={{ fontSize: '8px', color: '#808080' }} />
                    </div>
                    <div className={styles.content}>
                        <Typography.Text>{task}</Typography.Text>
                        <CalendarPopover item={item} onCalendarClick={handleCalendarClick}>
                            <div className={styles.dueDate}>
                                {dueDate && (
                                    <Button
                                        className={classNames(styles.active, { [styles.open]: handleCalendarClick })}
                                        icon={
                                            <CalendarOutlined
                                                className={styles.icon}
                                                onClick={() => handleCalendarClick(true)}
                                            />
                                        }
                                    />
                                )}
                                {dueDate && (
                                    <div className={styles.title}>
                                        {formatDate(dueDate, DATE_SHORT_REVERTED_FORMAT)}
                                    </div>
                                )}
                            </div>
                        </CalendarPopover>
                    </div>
                    <div className={styles.actions}>
                        <div>
                            <Button
                                className={styles.btn}
                                style={{ width: '24px', height: '24px' }}
                                icon={<EditOutlined className={styles.editIcon} onClick={handleEdit} />}
                            />
                        </div>
                        <div>
                            <CalendarPopover item={item} onCalendarClick={handleCalendarClick}>
                                <Button
                                    className={classNames(styles.btn, { [styles.open]: handleCalendarClick })}
                                    style={{ width: '24px', height: '24px' }}
                                    icon={
                                        <CalendarOutlined
                                            className={styles.editIcon}
                                            onClick={() => handleCalendarClick(true)}
                                        />
                                    }
                                />
                            </CalendarPopover>
                        </div>
                    </div>
                </List.Item>
            )}

            {isEditMode && (
                <List.Item className={styles.item}>
                    <EditItem item={item} onEditToggle={onEditToggle} />
                </List.Item>
            )}
        </>
    );
};
