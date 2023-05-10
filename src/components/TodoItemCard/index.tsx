import { InboxOutlined, CheckOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { Divider, Layout, Modal, Typography, Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { APP_ROUTES } from '../../router/routes';
import { useRootStore } from '../../store/rootStore';
import { TodoEditCard } from '../TodoEditCard';

import styles from './styles.module.scss';

// type Props = {
//     // item: TTodoItem;
//     visible: boolean,
//     isChecked?: boolean;
//     handleCancel: () => void;
// }

export const TodoItemCard: React.FC = () => {
    const { todos } = useRootStore();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const itemEdit = todos?.find(element => element.id === id);

    const handleClose = () => {
        navigate(location.state?.returnTo || APP_ROUTES.root.path);
    }

    const handleContentButtonClick = () => {
        setIsEdit(true);
    }

    // const handleCheckClick = () => {
    //     onEditTodo?.({
    //         ...item,
    //         isDone: !isChecked,
    //     });
    // }

    return (
        <Modal
            className={styles.card}
            visible={true}
            onCancel={handleClose}
            style={{ margin: 'auto' }}
            footer={null}
        >
            <Layout.Header>
                <InboxOutlined className={styles.inboxIcon} />
                <Typography.Text>Inbox</Typography.Text>
            </Layout.Header>
            <Divider />
            <Layout.Content>
                <div className={styles.content}>
                    <Button
                        className={classNames(styles.circle, { [styles.checked]: itemEdit?.isDone })}
                        role="checkbox"
                        aria-checked="false"
                        icon={<CheckOutlined
                            className={classNames(styles.check, { [styles.checked]: itemEdit?.isDone })}
                            style={{ fontSize: '8px', color: '#808080' }}
                        />}
                        disabled={isEdit}
                        // onClick={handleCheckClick}
                    />
                    {!isEdit && itemEdit &&
                        <div>
                            <Button type="text" className={styles.contentButton} onClick={handleContentButtonClick}>
                                <Typography.Text
                                    className={styles.title}
                                >
                                    {itemEdit.task}
                                </Typography.Text>
                            </Button>
                            <div>
                                <Button type="text" className={styles.contentButton} onClick={handleContentButtonClick}>
                                    <AlignLeftOutlined />
                                    <Typography.Text
                                        className={styles.description}
                                    >
                                        {itemEdit.description ? itemEdit.description : 'Description'}
                                    </Typography.Text>
                                </Button>
                            </div>
                        </div>
                    }

                    {isEdit && itemEdit &&
                        <TodoEditCard item={itemEdit} />
                    }
                </div>
            </Layout.Content>
        </Modal>
    );
}
