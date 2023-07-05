import React from "react";

import { Col, Dropdown, Form, Input, Layout, Menu, Row, Table } from "antd";

import Sider from "antd/es/layout/Sider";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";

const Danhsachcsboqua: React.FC = () => {
  interface DataType {
    idtb: React.Key;
    nametb: "Mike";
    addresstb: 32;
    hoatdongtb: "t";
    ketnoitb: "t";
    dichvutb: "t";
    chitiet: "chitiet";
    capnhat: "capnhat";
  }
  // Table
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "matb",
      key: "matb",
      render: () => "TB01",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "nametb",
      key: "nametb",
      width: 150,
    },
    {
      title: "Địa chỉ Ip",
      dataIndex: "addresstb",
      key: "addresstb",
      width: 150,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "hoatdongtb",
      key: "hoatdongtb",
      width: 150,
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "ketnoitb",
      key: "ketnoitb",
      width: 150,
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "dichvutb",
      key: "dichvutb",
      width: 150,
    },
    {
      title: "",
      dataIndex: "chitiet",
      key: "chitiet",
    },
    {
      title: "",
      dataIndex: "capnhat",
      key: "capnhat",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      idtb: i,
      nametb: "Mike",
      addresstb: 32,
      hoatdongtb: "t",
      ketnoitb: "t",
      dichvutb: "t",
      chitiet: "chitiet",
      capnhat: "capnhat",
    });
  }
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
                Thiết bị Quản lý cấp số
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
                  <h1 className="titletopbar">Quản lý cấp số</h1>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <label>Trạng thái hoạt động</label>
                    <Form.Item name="email">
                      <Input className="form-input" />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={10} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Chọn thời gian</label>
                    <Form.Item name="email">
                      <div className="">
                        <Input className="form-input" />
                      </div>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Từ khóa</label>
                    <Form.Item name="email">
                      <Input className="form-input" />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table columns={columns} dataSource={data} />
                  </div>
                </Col>
                <Col className="hang-table" span={2}>
                  <HomeOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/themdichvu";
                    }}
                  />
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Danhsachcsboqua;
