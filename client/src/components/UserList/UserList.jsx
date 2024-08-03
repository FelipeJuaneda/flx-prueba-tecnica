import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Tag,
  Space,
  Breadcrumb,
  ConfigProvider,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../features/users/userSlice";
import Loader from "../Loader";
import UserModal from "../UserModal";
import "./UserList.css";

const { Search } = Input;
const { Option } = Select;
const { confirm } = Modal;

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    confirm({
      title: "¿Estás seguro de que deseas eliminar este usuario?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(removeUser(id));
      },
    });
  };

  const handleSearch = (value) => {
    dispatch(fetchUsers(value));
  };

  const handleFilter = (value) => {
    dispatch(fetchUsers(value));
  };

  const handleModalOpen = (userId = null) => {
    setSelectedUserId(userId);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedUserId(null);
  };

  const columns = [
    { title: "Usuario", dataIndex: "username", key: "username", width: "20%" },
    { title: "Nombre", dataIndex: "name", key: "name", width: "20%" },
    { title: "Apellido", dataIndex: "lastname", key: "lastname", width: "20%" },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Activo" : "Inactivo"}
        </Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleModalOpen(record.id)}>
            Editar
          </Button>
          <Button type="link" onClick={() => handleDelete(record.id)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const components = {
    header: {
      cell: ({ children, ...restProps }) => (
        <th
          {...restProps}
          style={{
            backgroundColor: "rgb(217 217 217 / 39%)",
            fontWeight: "bold",
          }}
        >
          {children}
        </th>
      ),
    },
  };

  if (loading) return <Loader />;

  return (
    <ConfigProvider>
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>
      <Space
        className="space-container"
        style={{
          marginBottom: 16,
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Space size="middle">
          <Search
            placeholder="Buscar usuarios"
            onSearch={handleSearch}
            className="search-input"
          />
          <Select
            placeholder="Filtrar por estado"
            onChange={handleFilter}
            className="select-input"
          >
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Space>
        <Button
          className="addUserButton"
          type="primary"
          onClick={() => handleModalOpen()}
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          Agregar usuario
        </Button>
      </Space>
      <Table
        className="table"
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 9 }}
        components={components}
        style={{ width: "100%" }}
      />
      <UserModal
        visible={modalVisible}
        onClose={handleModalClose}
        userId={selectedUserId}
      />
    </ConfigProvider>
  );
};

export default UserList;
