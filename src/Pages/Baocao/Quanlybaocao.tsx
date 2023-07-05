import React, { useEffect, useState } from "react";

import { Col, Dropdown, Form, Input, Layout, Menu, Row, Table } from "antd";

import Sider from "antd/es/layout/Sider";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { getDatabase, onValue, ref } from "firebase/database";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

interface OrderNumbers {
  STT: string;
  namekh: string;
  namedv: string;
  startdate: string;
  enddate: string;
  provide: string;
  uuid: string;
  isActive: boolean;
}
const Quanlybaocao: React.FC = () => {
  const [order, setOrder] = useState<OrderNumbers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const orderRef = ref(db, "ordernumbers");

        onValue(orderRef, (snapshot) => {
          const data: OrderNumbers[] = [];
          snapshot.forEach((childSnapshot) => {
            const order = childSnapshot.val() as OrderNumbers;
            data.push(order);
          });
          setOrder(data);
        });
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

  // Table
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      with: 150,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "namedv",
      key: "namedv",
      width: 200,
    },
    {
      title: "Thời gian cấp",
      dataIndex: "startdate",
      key: "startdate",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Hoạt động" : "Bỏ qua"}
        </span>
      ),
    },
    {
      title: "Nguồn cấp",
      dataIndex: "provide",
      key: "provide",
      render: (text: any, record: OrderNumbers) => <span>Hệ thống</span>,
      width: 200,
    },
  ];

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
                Thiết bị Danh sách dịch vụ
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
                  <h1 className="titletopbar">Danh sách dịch vụ</h1>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <Form.Item name="range-picker" label="Chọn thời gian">
                      <RangePicker />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table columns={columns} dataSource={order} />
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

export default Quanlybaocao;
