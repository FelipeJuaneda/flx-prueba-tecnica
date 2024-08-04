import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./UserModal.css";
import { addUser, editUser } from "../../features/users/userSlice";

const { Option } = Select;

const UserModal = ({ open, onClose, userId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    // Cuando se selecciona un usuario, los valores del formulario se llenan con los datos del usuario
    // Si no hay usuario seleccionado, los campos del formulario se resetean
    if (userId) {
      const user = users.find((user) => user.id === userId);
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [userId, users, form]);

  const handleFinish = (values) => {
    // Despacha la acción correspondiente (añadir o editar usuario) según si hay un userId presente
    if (userId) {
      dispatch(editUser({ id: userId, user: values }));
    } else {
      dispatch(addUser(values));
    }
    onClose();
  };

  return (
    <Modal
      title={userId ? "Editar usuario" : "Agregar usuario"}
      open={open}
      onCancel={onClose}
      footer={null}
      forceRender
      width={600}
      className="user-modal"
    >
      <Form
        className="formContent"
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="username"
              label="Usuario"
              rules={[
                { required: true, message: "Por favor ingresa el usuario" },
              ]}
            >
              <Input placeholder="johndoe" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Por favor ingresa el email" },
                { type: "email", message: "Por favor ingresa un email válido" },
              ]}
            >
              <Input placeholder="johndoe@domain.com" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[
                { required: true, message: "Por favor ingresa el nombre" },
              ]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="lastname"
              label="Apellido"
              rules={[
                { required: true, message: "Por favor ingresa el apellido" },
              ]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="status"
              label="Estado"
              rules={[
                { required: true, message: "Por favor selecciona el estado" },
              ]}
            >
              <Select placeholder="Seleccione un estado">
                <Option value="active">Activo</Option>
                <Option value="inactive">Inactivo</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="age"
              label="Edad"
              rules={[
                { required: true, message: "Por favor ingresa la edad" },
                {
                  validator: (_, value) =>
                    value >= 0 && value <= 100
                      ? Promise.resolve()
                      : Promise.reject("La edad debe estar entre 0 y 100"),
                },
              ]}
            >
              <Input type="number" placeholder="43" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item className="buttonSubmitContent">
          <Button
            className="buttonSubmit"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {userId ? "Editar usuario" : "Agregar usuario"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
