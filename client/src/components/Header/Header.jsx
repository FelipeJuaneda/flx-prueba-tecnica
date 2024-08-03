import React from "react";
import { Layout } from "antd";
import "./Header.css";
import logoFlexxus from "../../assets/images/logoflexxus.png";
const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Layout>
      <Header className="headerContainer">
        <div className="imgContainer">
          <img className="imgLogo" src={logoFlexxus} alt="Flexxus Logo" />
        </div>
      </Header>
    </Layout>
  );
};

export default CustomHeader;
