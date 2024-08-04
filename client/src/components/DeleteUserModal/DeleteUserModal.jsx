import React from "react";
import { Modal, Button, Typography, Flex } from "antd";
import "./DeleteUserModal.css";
const { Text } = Typography;

const DeleteUserModal = ({ open, onClose, onConfirm, username }) => {
  return (
    <Modal
      title="Eliminar usuario"
      open={open}
      onCancel={onClose}
      footer={null}
      className="delete-user-modal"
      width={400}
    >
      <Flex justify="space-between" className="modal-body">
        <Text className="modal-text">
          ¿Está seguro que quiere eliminar el usuario{" "}
          <Text type="danger" strong>
            @{username}
          </Text>
          ?
        </Text>
        <Flex justify="flex-end" gap={13}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="primary" danger onClick={onConfirm}>
            Eliminar
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default DeleteUserModal;
