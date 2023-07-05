import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  message,
} from "antd";

import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import { getDatabase, onValue, ref, update } from "firebase/database";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

const Capnhattaikhoan: React.FC = () => {
  const location = useLocation();
  const users = location.state?.users;
  const [updatedUser, setUpdatedUser] = useState(users);
  const db = getDatabase();

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedUser((prevState: any) => ({ ...prevState, name: value }));
  };

  const handleNamednChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedUser((prevState: any) => ({ ...prevState, namedn: value }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedUser((prevState: any) => ({ ...prevState, phone: value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedUser((prevState: any) => ({ ...prevState, email: value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedUser((prevState: any) => ({ ...prevState, password: value }));
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setUpdatedUser((prevState: any) => ({
      ...prevState,
      confirmPassword: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleConditionChange = (value: string) => {
    setSelectedCondition(value);
  };

  useEffect(() => {
    if (users && users.id) {
      const userRef = ref(db, "users/" + users.id);
      console.log(userRef);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUpdatedUser((prevState: any) => ({ ...prevState, ...data }));
        }
      });
    }
  }, [db, users]);

  const handleUpdateAccount = async () => {
    try {
      if (!updatedUser || !updatedUser.id) {
        console.error("ID người dùng không hợp lệ!");
        return;
      }

      const userPath = "users/" + updatedUser.id;
      const userRef = ref(db, userPath);

      const updates = {
        name: updatedUser.name,
        namedn: updatedUser.namedn,
        phone: updatedUser.phone,
        email: updatedUser.email,
        password: updatedUser.password,
        confirmPassword: updatedUser.confirmPassword,
        role: updatedUser.role,
        condition: updatedUser.condition,
      };

      await update(userRef, updates);
      message.success("Cập nhật tài khoản thành công!");
    } catch (error) {
      console.error("Lỗi cập nhật tài khoản:", error);
      message.error("Có lỗi xảy ra khi cập nhật tài khoản!");
    }
  };
  console.log(updatedUser);

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
          <Content style={{ marginLeft: "70px" }}>
            <Row>
              <Col span={24}>
                <h1 className="titletopbar">Quản lý thiết bị</h1>
              </Col>
            </Row>
            <Row>
              <Card className="card-1">
                <h1 className="titletopbar">Thông tin chi tiết</h1>
                <Row>
                  <Col span={12}>
                    <div>
                      <label>Họ tên</label>
                      <Form.Item name="mathietbi">
                        <Input
                          className="input-chung"
                          name="name"
                          defaultValue={users.name}
                          onChange={handleNameChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Số điện thoại</label>
                      <Form.Item name="ten">
                        <Input
                          className="input-chung"
                          name="phone"
                          defaultValue={users.phone}
                          onChange={handlePhoneChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Email</label>
                      <Form.Item name="ip">
                        <Input
                          className="input-chung"
                          name="email"
                          defaultValue={users.email}
                          onChange={handleEmailChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Vai trò</label>
                      <Form.Item name="">
                        <Select
                          className=""
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <Select.Option value="Kế toán">Kế toán</Select.Option>
                          <Select.Option value="Quản lý">Quản lý</Select.Option>
                          <Select.Option value="Admin">Admin</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <label>Tên đăng nhập</label>
                      <Form.Item name="login">
                        <Input
                          className="input-chung"
                          name="namedn"
                          defaultValue={users.namedn}
                          onChange={handleNamednChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Mật khẩu</label>
                      <Form.Item name="password">
                        <Input
                          className="input-chung"
                          name="password"
                          defaultValue={users.password}
                          onChange={handlePasswordChange}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Nhập lại mật khẩu</label>

                      <Form.Item name="">
                        <Input
                          className="input-chung"
                          name="confirmPassword"
                          defaultValue={users.confirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Tình trạng</label>
                      <Form.Item name="">
                        <Select
                          className=""
                          value={selectedCondition}
                          onChange={handleConditionChange}
                        >
                          <Select.Option value="Tất cả">Tất cả</Select.Option>
                          <Select.Option value="Hoạt động">
                            Hoạt động
                          </Select.Option>
                          <Select.Option value="Ngưng hoạt động">
                            Ngưn hoạt động
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}></Col>
                </Row>
              </Card>
            </Row>
            <Row>
              <Content
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  style={{ marginLeft: "-150px" }}
                  className="btn-thietbi2"
                >
                  Hủy bỏ
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  className="btn-thietbi"
                  onClick={handleUpdateAccount}
                >
                  Cập nhật
                </Button>
              </Content>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Capnhattaikhoan;
