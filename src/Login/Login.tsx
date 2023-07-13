import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import "../StylePages/Login.css";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { getDatabase, onValue, ref, set } from "firebase/database";
import { auth } from "./../Firebase/Firebase";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

interface UserData {
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
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
    setInputError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
    setInputError(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("Login successful");

      // Lấy thông tin người dùng từ Realtime Database
      const usersRef = ref(getDatabase(), "users");
      onValue(usersRef, (snapshot) => {
        const usersData = snapshot.val();

        // Tìm thông tin người dùng dựa trên email
        const userData: UserData | undefined = Object.values(usersData).find(
          (user: any) => user.email === values.email
        ) as UserData;

        if (userData) {
          // Lưu thông tin người dùng vào local storage
          localStorage.setItem("userData", JSON.stringify(userData));

          // Đăng nhập thành công, cập nhật trạng thái Reduxs
          dispatch(login({ username: values.email }));

          // Cập nhật trạng thái hoạt động của tài khoản
          userData.condition = "Hoạt động";
          // Update lại dữ liệu người dùng trong Realtime Database
          // Sử dụng userData.id để xác định người dùng cần cập nhật
          const userToUpdateRef = ref(getDatabase(), `users/${userData.id}`);
          set(userToUpdateRef, userData);

          // Chuyển hướng đến trang Home
          history.push(`/user`);
        }
      });
    } catch (error) {
      console.log("Login failed", error);
      setErrorMessage(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu."
      );
      setInputError(true);
    }
  };
  return (
    <Content>
      <Row>
        <Col className="bg1 box" span={10}>
          <div style={{ marginTop: "80px" }}>
            <img src="/asset/img/logoalta.png" alt="" />
          </div>
          <Form
            style={{ marginTop: "50px" }}
            name="login"
            onFinish={handleSubmit}
          >
            <div style={{ marginBottom: "16px" }}>
              <label>Tên đăng nhập</label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                validateStatus={inputError ? "error" : ""}
              >
                <Input
                  className={`login ${inputError ? "error-input" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Item>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label>Mật khẩu</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                validateStatus={inputError ? "error" : ""}
                help={inputError ? errorMessage : null}
              >
                <Input.Password
                  className={`login ${inputError ? "error-input" : ""}`}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Item>
            </div>

            <div style={{ marginTop: "-20px" }}>
              <Link className="forgetpass" type="primary" to="/forget">
                Quên mật khẩu?
              </Link>
            </div>

            <div style={{ marginTop: "-30px" }}>
              <Button className="buttonlogin" type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </div>
          </Form>
        </Col>
        <Col className="" span={14}>
          <img src="/asset/img/bgh.png" alt="" />
        </Col>
      </Row>
    </Content>
  );
};

export default Login;
