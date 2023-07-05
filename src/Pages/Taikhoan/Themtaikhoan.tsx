import React, { useState } from "react";

import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Row,
  Select,
  Upload,
  message,
} from "antd";

import Sider from "antd/es/layout/Sider";
import { BellOutlined, UploadOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { getDatabase, push, ref, set, update } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

interface Users {
  name: string;
  namedn: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  condition: string;
  avatar: string;
  id: string;
}

const Themtaikhoan: React.FC = () => {
  const [accountData, setAccountData] = useState<Users>({
    name: "",
    namedn: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    condition: "",
    avatar: "",
    id: "",
  });
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarUpload = (file: File) => {
    setAvatarFile(file);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddAccount = async () => {
    try {
      const auth = getAuth();
      const { email, password } = accountData;

      // Tạo tài khoản người dùng trong Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      if (user) {
        const database = getDatabase();
        const usersRef = ref(database, "users");

        const newUserRef = push(usersRef);
        const newUserKey = newUserRef.key;

        const newUserData = {
          id: newUserKey,
          name: accountData.name,
          namedn: accountData.namedn,
          phone: accountData.phone,
          email: accountData.email,
          password: accountData.password,
          confirmPassword: accountData.confirmPassword,
          role: selectedRole,
          condition: selectedCondition,
          avatar: accountData.avatar, // Giữ nguyên đường dẫn tạm thời
        };

        // Lưu thông tin tài khoản vào Realtime Database
        await set(newUserRef, newUserData);

        if (avatarFile) {
          const storage = getStorage();
          const storageRefInstance = storageRef(
            storage,
            `avatars/${newUserKey}`
          );
          await uploadBytes(storageRefInstance, avatarFile);

          // Lấy đường dẫn ảnh từ Firebase Storage
          const downloadURL = await getDownloadURL(storageRefInstance);

          // Cập nhật lại trường "avatar" trong Realtime Database với đường dẫn ảnh
          await update(ref(database, `users/${newUserKey}`), {
            avatar: downloadURL,
          });
        }

        message.success("Thêm tài khoản thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm tài khoản:", error);
      // Xử lý lỗi nếu cần
    }
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

            <Menu.Item className="menu-item">Đăng xuất</Menu.Item>
          </Menu>
        </Sider>
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
              <img className="imgaccount" src="/asset/img/ao2.jpg" alt="" />
            </Col>
            <Col className="" span={2}>
              <p className="xc">xin chào</p>
              <p className="name">Đào Minh Hùng</p>
            </Col>
          </Header>
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
                          value={accountData.name}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Số điện thoại</label>
                      <Form.Item name="ten">
                        <Input
                          className="input-chung"
                          name="phone"
                          value={accountData.phone}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Email</label>
                      <Form.Item name="ip">
                        <Input
                          className="input-chung"
                          name="email"
                          value={accountData.email}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Vai trò</label>
                      <Form.Item name="role">
                        <Select
                          className="role"
                          value={selectedRole}
                          onChange={(value) => setSelectedRole(value)}
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
                          value={accountData.namedn}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Mật khẩu</label>
                      <Form.Item name="password">
                        <Input
                          className="input-chung"
                          name="password"
                          value={accountData.password}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Nhập lại mật khẩu</label>

                      <Form.Item name="">
                        <Input
                          className="input-chung"
                          name="confirmPassword"
                          value={accountData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Tình trạng</label>
                      <Form.Item name="condition">
                        <Select
                          className="condition"
                          value={selectedCondition}
                          onChange={(value) => setSelectedCondition(value)}
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
                <div>
                  <label>Ảnh đại diện</label>
                  <Form.Item name="avatar">
                    <Upload
                      beforeUpload={(file) => {
                        handleAvatarUpload(file);
                        return false;
                      }}
                    >
                      <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                  </Form.Item>
                </div>
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
                  onClick={handleAddAccount}
                >
                  Thêm tài khoản
                </Button>
              </Content>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Themtaikhoan;
