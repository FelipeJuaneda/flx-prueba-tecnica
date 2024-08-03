import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../features/users/userSlice";

const { Option } = Select;

const UserModal = ({ visible, onClose, userId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    if (userId) {
      const user = users.find((user) => user.id === userId);
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [userId, users, form]);

  const handleFinish = (values) => {
    if (userId) {
      dispatch(editUser({ id: userId, user: values }));
    } else {
      dispatch(addUser(values));
    }
    onClose();
  };

  return (
    <Modal
      title={userId ? "Editar Usuario" : "Crear Usuario"}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="username"
          label="Usuario"
          rules={[{ required: true, message: "Por favor ingresa el usuario" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Apellido"
          rules={[{ required: true, message: "Por favor ingresa el apellido" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Estado"
          rules={[
            { required: true, message: "Por favor selecciona el estado" },
          ]}
        >
          <Select>
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {userId ? "Actualizar" : "Crear"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
