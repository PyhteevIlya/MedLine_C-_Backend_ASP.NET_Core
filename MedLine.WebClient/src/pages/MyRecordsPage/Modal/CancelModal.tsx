import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const CancelModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Button type="primary" onClick={showModal}>
            Open Modal
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Вы уверенны, что хотите отменить запись?</p>
        </Modal>
        </>
    );
};

export default CancelModal;