import React from "react";
import { Row, Col } from "antd";
import UserList from "../../components/UserList/UserList";
import "./UserListPage.css";
const UserListPage = () => {
  return (
    <Row className="userListPageContainer" justify="center">
      <Col xs={24} sm={22} md={20}>
        <UserList />
      </Col>
    </Row>
  );
};

export default UserListPage;
