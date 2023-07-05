import React from "react";

import { Card, Col, Dropdown, Layout, Menu, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";

const Thongtincapso: React.FC = () => {
  const location = useLocation();
  const orders = location.state?.orders;

  console.log(orders);
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

            <Menu.Item className="menu-item">Đăng xuất</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 style={{ marginLeft: "-20px" }} className="titletopbar">
                Thiết bị Danh sách thiết bị
              </h1>
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
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách thiết bị</h1>
                </Col>
              </Row>
              <Card className="">
                <h1 className="titletopbar">Thông tin chi tiết</h1>
                <Row>
                  <Col span={4}>
                    <div>
                      <label className="chu" htmlFor="">
                        Họ tên
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Tên dịch vụ
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Số thứ tự
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Thời gian cấp
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Hạn sử dụng
                      </label>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <label className="chu" htmlFor=""></label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.namedv}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.STT}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.startdate}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.enddate}</span>
                      </label>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Nguồn cấp
                      </label>
                      <span>{orders?.provide}</span>
                    </div>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Trạng thái
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Số điện thoại
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Địa chỉ email
                      </label>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        <span>{orders?.provide}</span>
                      </label>
                    </div>
                  </Col>
                </Row>
              </Card>
              {/* <Col className="hang-table" span={2}>
                  <HomeOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/addtb";
                    }}
                  />
                </Col> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Thongtincapso;
