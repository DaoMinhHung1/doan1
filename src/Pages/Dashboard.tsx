import React from "react";

import { Card, Col, Dropdown, Layout, Menu, Progress } from "antd";

import "../StylePages/Home.css";
import Sider from "antd/es/layout/Sider";
import { BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../redux/userSlice";
import { RootState } from "../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const Home: React.FC = () => {
  const history = useHistory();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAsync())
      .unwrap()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
        // Handle the error if necessary
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Quản lý vai trò</Menu.Item>
      <Menu.Item key="2" onClick={() => (window.location.href = "/user")}>
        Quản lý tài khoản
      </Menu.Item>
      <Menu.Item key="3">Nhật kí người dùng</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout>
        <Sider
          className="menubar"
          width={200}
          style={{ backgroundColor: "Menu" }}
        >
          <Menu theme="light" className="itembar">
            <img className="alta" src="/asset/img/logoalta.png" alt="" />
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/thietbi";
              }}
            >
              Thiết bị
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/dichvu";
              }}
            >
              Dịch vụ
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/capso";
              }}
            >
              Cấp số
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/baocao";
              }}
            >
              Báo cáo
            </Menu.Item>
            <Dropdown overlay={menu}>
              <Menu.Item
                className="menu-item"

                // onClick={(e) => e.preventDefault()}
              >
                Cài đặt hệ thống
              </Menu.Item>
            </Dropdown>
            <Menu.Item className="menu-item" onClick={handleLogout}>
              Đăng xuất
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Layout>
            <Header className="account bgheader">
              <Col span={15}>
                <h1 className="titletopbar">Dashboard</h1>
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
                <img className="imgaccount" src="/asset/img/ao2.jpg" alt="" />
              </Col>
              <Col className="" span={2}>
                <p className="xc">xin chào</p>
                <p className="name">Đào Minh Hùng</p>
              </Col>
            </Header>
            <Layout>
              <Content className="">
                <h1 style={{ marginLeft: "70px" }} className="titletopbar">
                  Biểu đồ cấp số
                </h1>
                <div className="card-dashboard-container">
                  <div className="card-dashboard" style={{ marginTop: "10px" }}>
                    <Card>
                      <div>
                        <Progress type="circle" size={60} percent={90} />
                        <div className="card-info">
                          <div>
                            <p>200</p>
                          </div>
                          <div>
                            <p>Số thứ tự đã cấp</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="card-dashboard" style={{ marginTop: "10px" }}>
                    <Card>
                      <div>
                        <Progress type="circle" size={60} percent={90} />
                        <div className="card-info">
                          <div>
                            <p>200</p>
                          </div>
                          <div>
                            <p>Số thứ tự đã cấp</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="card-dashboard" style={{ marginTop: "10px" }}>
                    <Card>
                      <div>
                        <Progress type="circle" size={60} percent={90} />
                        <div className="card-info">
                          <div>
                            <p>200</p>
                          </div>
                          <div>
                            <p>Số thứ tự đã cấp</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="card-dashboard" style={{ marginTop: "10px" }}>
                    <Card>
                      <div>
                        <Progress type="circle" size={60} percent={90} />
                        <div className="card-info">
                          <div>
                            <p>200</p>
                          </div>
                          <div>
                            <p>Số thứ tự đã cấp</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  {/* Thêm các thẻ card-dashboard khác vào đây */}
                </div>
              </Content>
              <Sider
                className="barbenphai"
                width={401}
                style={{ backgroundColor: "#fff" }}
              >
                <div
                  style={{
                    margin: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  className="titletopbar"
                >
                  Tổng quan
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Card>
                    <div className="card-content">
                      <Progress type="circle" size={60} percent={90} />
                      <div className="card-info">
                        <div>
                          <p>4.100</p>
                          <p>Thiết bị</p>
                        </div>
                        <div>
                          <p>Đang hoạt động</p>
                          <p>Ngưng hoạt động</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Card className="card-container">
                    <div className="card-content">
                      <Progress type="circle" size={60} percent={90} />
                      <div className="card-info">
                        <div>
                          <p>4.100</p>
                          <p>Thiết bị</p>
                        </div>
                        <div>
                          <p>Đang hoạt động</p>
                          <p>Ngưng hoạt động</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Card className="card-container">
                    <div className="card-content">
                      <Progress type="circle" size={60} percent={90} />
                      <div className="card-info">
                        <div>
                          <p>4.100</p>
                          <p>Thiết bị</p>
                        </div>
                        <div>
                          <p>Đang hoạt động</p>
                          <p>Ngưng hoạt động</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </Sider>
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
