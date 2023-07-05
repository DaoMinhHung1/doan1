import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Row,
  Table,
} from "antd";

import Sider from "antd/es/layout/Sider";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";

interface UserData {
  name: string;
  namedn: string;
  email: string;
  password: string;
  passwoordagain: string;
  sdt: string;
  role: string;
  condition: string;
  id: string;
}

const Quanlytaikhoan: React.FC = () => {
  const history = useHistory();

  const handleUpdate = (userID: string) => {
    const selectedUser = usersData.find((users) => users.id === userID);
    if (selectedUser) {
      console.log("Selected device:", selectedUser);
      // setSelectedService(selectedService);
      history.push(`/capnhattaikhoan/${userID}`, { users: selectedUser });
    } else {
      console.log("Không có dữ liệu thiết bị");
    }
  };

  // Table
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "namedn",
      key: "namedn",
      width: 150,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Số điện thoại ",
      dataIndex: "sdt",
      key: "sdt",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 200,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "condition",
      key: "condition",
      width: 200,
    },
    {
      title: "",
      dataIndex: "updateAction",
      key: "updateAction",
      width: 100,
      render: (_text: any, record: UserData) => (
        <>
          <Button onClick={() => handleUpdate(record.id)}>Cập nhật</Button>
        </>
      ),
    },
  ];

  //load dữ liệu từ data xuống
  const [usersData, setUsersData] = useState<UserData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const servicesRef = ref(db, "users");

        onValue(servicesRef, (snapshot) => {
          const data: UserData[] = [];
          snapshot.forEach((childSnapshot) => {
            const device = childSnapshot.val() as UserData;
            data.push(device);
          });
          setUsersData(data);
        });
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

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
                <Col span={16} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <label>Trạng thái hoạt động</label>
                    <Form.Item name="email">
                      <Input className="form-input" />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={7} style={{ marginLeft: "", flex: 1 }}>
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
                    <Table
                      columns={columns}
                      dataSource={usersData}
                      pagination={{
                        pageSize: 5,
                        pageSizeOptions: ["5", "10", "15"],
                      }}
                    />
                  </div>
                </Col>
                <Col
                  style={{ marginTop: "20px" }}
                  className="hang-table icon-thietbi"
                  span={2}
                >
                  <HomeOutlined
                    onClick={() => {
                      window.location.href = "/themtaikhoan";
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

export default Quanlytaikhoan;
