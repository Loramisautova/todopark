import { CalendarOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useState, useEffect } from 'react';

import { DATE_SHORT_REVERTED_FORMAT } from '../../consts/formats';
import { useRootStore } from '../../store/rootStore';
import { TodoItem as TTodoItem } from '../../types';
import { formatDate } from '../../utils/dates';
import { CalendarPopover } from '../CalendarPopover';
import { EditItem } from '../EditItem';

import styles from './styles.module.scss';

type Props = {
    item: TTodoItem;
    isEditMode?: boolean;
    onEditToggle?: (id: string) => void;
    onCalendarClick?: (value: boolean) => void;
};

/**
 * @DEPRECATED
 */
export const TodoItem: React.FC<Props> = ({ item, isEditMode, onEditToggle }) => {
    const { id, task, dueDate, isDone } = item;

    const { onEditTodo } = useRootStore();
    const [isChecked, setIsChecked] = useState(isDone);

    useEffect(() => {
        debouncedEdit();
    }, [isChecked]);

    const handleEdit = () => {
        // передаем id редактированного элемента
        onEditToggle?.(id);
    };

    const handleCalendarClick = (value: boolean) => {
        return value;
    };

    const debouncedEdit = debounce(
            () => {
                onEditTodo?.({
                    ...item,
                    isDone: isChecked,
                });
            },
            500,
    );

    const handleCheckClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            {!isEditMode && (
                <List.Item className={styles.item}>
                    <Button
                        className={classNames(styles.circle, { [styles.checked]: isChecked })}
                        role="checkbox"
                        aria-checked="false"
                        icon={<CheckOutlined
                            className={classNames(styles.check, { [styles.checked]: isChecked })}
                            style={{ fontSize: '8px', color: '#808080' }}
                        />}
                        onClick={handleCheckClick}
                    />
                    <div className={styles.content}>
                        <Typography.Text
                            className={classNames({ [styles.textChecked]: isChecked })}
                        >
                            {task}
                        </Typography.Text>
                        <CalendarPopover item={item} onCalendarClick={handleCalendarClick}>
                            <div className={styles.dueDate}>
                                {dueDate && (
                                    <Button
                                        className={styles.active}
                                        icon={
                                            <CalendarOutlined
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
                                    className={styles.btn}
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
