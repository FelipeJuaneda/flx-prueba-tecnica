import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Space,
  Breadcrumb,
  ConfigProvider,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../features/users/userSlice";
import Loader from "../Loader/Loader";
import UserModal from "../UserModal/UserModal";
import "./UserList.css";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";

const { Search } = Input;
const { Option } = Select;

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ search: searchTerm, status: filterStatus }));
  }, [dispatch, filterStatus]);

  const handleDelete = (id, username) => {
    setSelectedUserId(id);
    setSelectedUsername(username);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(removeUser(selectedUserId));
    setDeleteModalOpen(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    dispatch(fetchUsers({ search: value, status: filterStatus }));
  };

  const handleFilter = (value) => {
    setFilterStatus(value);
    dispatch(fetchUsers({ search: searchTerm, status: value }));
  };

  const handleModalOpen = (userId = null) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
          <Button type="link" onClick={() => handleDelete(record.id, record.username)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const components = {
    header: {
      cell: ({ children, ...restProps }) => (
        <th id="firstRowTable" {...restProps}>
          {children}
        </th>
      ),
    },
  };

  return (
    <ConfigProvider>
      <Breadcrumb
        className="breadcrumb"
        items={[{ title: "Usuarios" }, { title: "Listado de usuarios" }]}
      />
      <Space className="space-container">
        <Space size="middle">
          <Search
            placeholder="Buscar usuarios"
            onSearch={handleSearch}
            value={searchTerm}
            allowClear
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Select
            placeholder="Filtrar por estado"
            onChange={handleFilter}
            value={filterStatus || undefined}
            className="select-input"
          >
            <Option value="">Todos</Option>
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </Space>
        <Button
          className="addUserButton"
          type="primary"
          onClick={() => handleModalOpen()}
        >
          Agregar usuario
        </Button>
      </Space>

      {loading ? (
        <Loader />
      ) : (
        <Table
          className="table"
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 9 }}
          components={components}
          scroll={{ x: 800 }}
        />
      )}

      <UserModal
        open={modalOpen}
        onClose={handleModalClose}
        userId={selectedUserId}
      />
      <DeleteUserModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        username={selectedUsername}
      />
    </ConfigProvider>
  );
};

export default UserList;
