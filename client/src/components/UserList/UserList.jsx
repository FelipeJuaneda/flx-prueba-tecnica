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
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, removeUser } from "../../features/users/userSlice";
import Loader from "../Loader/Loader";
import UserModal from "../UserModal/UserModal";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import "./UserList.css";
const { Search } = Input;
const { Option } = Select;

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, total } = useSelector((state) => state.users);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    dispatch(
      fetchUsers({ search: searchTerm, status: filterStatus, limit, offset })
    );
  }, [dispatch, filterStatus, currentPage]);

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
    setCurrentPage(1);
    dispatch(
      fetchUsers({ search: value, status: filterStatus, limit, offset: 0 })
    );
  };

  const handleFilter = (value) => {
    setFilterStatus(value);
    setCurrentPage(1);
    dispatch(
      fetchUsers({ search: searchTerm, status: value, limit, offset: 0 })
    );
  };

  const handleModalOpen = (userId = null) => {
    setSelectedUserId(userId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUserId(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tableColumns = [
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
          <Button
            type="link"
            onClick={() => handleDelete(record.id, record.username)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const tableHeader = {
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
          columns={tableColumns}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: limit,
            total,
            onChange: handlePageChange,
          }}
          components={tableHeader}
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
