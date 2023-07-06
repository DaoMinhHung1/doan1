import React, { useState } from "react";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Upload,
  message,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { getDatabase, push, ref, set, update } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

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
      // Kiểm tra các trường bắt buộc không được để trống
      if (
        !accountData.name ||
        !accountData.namedn ||
        !accountData.phone ||
        !accountData.email ||
        !accountData.password ||
        !accountData.confirmPassword ||
        !selectedRole ||
        !selectedCondition
      ) {
        message.error("Vui lòng nhập đầy đủ thông tin tài khoản!");
        return;
      }

      // Kiểm tra email và password đã được nhập
      if (!accountData.email || !accountData.password) {
        message.error("Vui lòng nhập email và mật khẩu!");
        return;
      }

      // Kiểm tra mật khẩu và xác nhận mật khẩu
      if (accountData.password !== accountData.confirmPassword) {
        message.error("Mật khẩu nhập không giống nhau!");
        return;
      }

      // Tiếp tục xử lý thêm tài khoản...
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
                <h1 style={{ marginTop: "-10px" }} className="titletopbar">
                  Thông tin chi tiết
                </h1>
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
                          style={{ width: "450px" }}
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
                          style={{ width: "450px" }}
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
            <Row style={{ marginTop: "-10px" }}>
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
