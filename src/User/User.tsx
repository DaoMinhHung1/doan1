import React from "react";
import { Card, Col, Form, Layout, Menu, Row } from "antd";
import "../StylePages/Home.css";
import Sider from "antd/es/layout/Sider";
import { BellOutlined, CameraOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import SiderComponent from "../Component/SiderComponent";
const { Content, Header } = Layout;

const User: React.FC = () => {
  const location = useLocation();
  const userData = location.search
    ? Object.fromEntries(new URLSearchParams(location.search.slice(1)))
    : JSON.parse(localStorage.getItem("userData") || "{}");

  console.log(userData);
  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <Header className="account bgheader">
          <Col span={15}>
            <h1 className="titletopbar">Thông tin cá nhân</h1>
          </Col>
          <Col span={5}>
            <div className="">
              <BellOutlined
                style={{
                  fontSize: "24px",
                  color: "red",
                  marginLeft: "200px",
                }}
              />
            </div>
          </Col>
          <Col span={2}>
            <img className="imgaccount" src={userData.avatar} alt="" />
          </Col>
          <Col className="" span={2}>
            <p className="xc">xin chào</p>
            <p className="name">{userData.name}</p>
          </Col>
        </Header>
        <Content>
          <Card className="card">
            <Row gutter={16}>
              <Col span={6}>
                <div className="avatar-container">
                  <img
                    style={{ marginLeft: "-40px" }}
                    className="account-info"
                    src={userData.avatar} // Remove the curly braces here
                    alt=""
                  />
                  <div className="camera-icon">
                    <CameraOutlined />
                  </div>
                  <h1 style={{ margin: "20px" }} className="name">
                    Đào Minh Hùng
                  </h1>
                </div>
              </Col>
              <Col style={{ marginLeft: "-20px" }} span={8}>
                <div>
                  <label>Tên người dùng</label>
                  <Form.Item className="input-dl" name="email">
                    <span>{userData.name}</span>
                  </Form.Item>
                </div>

                <div>
                  <label>Số điện thoại</label>
                  <Form.Item className="input-dl" name="email">
                    <span>{userData.phone}</span>
                  </Form.Item>
                </div>
                <div>
                  <label>Email</label>
                  <Form.Item className="input-dl" name="email">
                    <span>{userData.email}</span>
                  </Form.Item>
                </div>
              </Col>
              <Col style={{ marginLeft: "70px" }} span={8}>
                <div>
                  <label>Tên đăng nhập</label>
                  <Form.Item className="input-dl" name="email">
                    <span>{userData.namedn}</span>
                  </Form.Item>
                </div>
                <div>
                  <label>Mật khẩu</label>
                  <Form.Item className="input-dl" name="email">
                    <span>{userData.password}</span>
                  </Form.Item>
                </div>
                <div>
                  <label>Vai trò</label>
                  <Form.Item className="input-dl" name="email">
                    <span>{userData.role}</span>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default User;
