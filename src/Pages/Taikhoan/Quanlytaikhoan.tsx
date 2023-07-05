import React, { useEffect, useState } from "react";

import { Button, Col, Form, Input, Layout, Row, Table } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";
import { getDatabase, onValue, ref } from "firebase/database";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

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

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
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
