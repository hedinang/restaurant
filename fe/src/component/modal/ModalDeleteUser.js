import React from 'react';
import { Button, Modal } from "antd";
import { Typography } from 'antd';
import { deleteUser } from "../../api/api";
const { Text } = Typography;
export const ModalDeleteUser = ({ show, close, data, deleteSuccess }) => {
    const remove = async () => {
        const result = await deleteUser(data.id)
        if (result) {
            deleteSuccess()
        }
    }
    return (
        <Modal
            open={show}
            title="Warning action!"
            keyboard={false}
            closable={false}
            footer={[
                <Button onClick={remove} type="primary">
                    Allow
                </Button>,
                <Button onClick={close} type="primary">
                    Cancel
                </Button>
            ]}
            width={650}
        >
            <Text strong> Do you ensure to delete user: &nbsp;<span style={{ color: 'blue' }}>{data?.email}</span></Text>
        </Modal>
    )
}