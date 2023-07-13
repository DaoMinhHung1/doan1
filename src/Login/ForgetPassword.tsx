import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import "../StylePages/Forget.css";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
    setInputError(false);
  };

  const handleSubmit = async () => {
    if (!email) {
      setErrorMessage("Vui lòng nhập địa chỉ email!");
      setInputError(true);
      return;
    }

    try {
      const auth = getAuth();
      const actionCodeSettings = {
        url: `${
          window.location.origin
        }/forget/newpass?email=${encodeURIComponent(email)}`,
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      setErrorMessage(
        "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư đến."
      );
      setInputError(false);

      // Chuyển hướng đến trang New Password và truyền email qua URL
      // history.push(`/forget/newpass?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setErrorMessage(
        "Yêu cầu đặt lại mật khẩu không thành công. Vui lòng kiểm tra lại địa chỉ email."
      );
      setInputError(true);
    }
  };

  return (
    <div>
      <Row>
        <Col className="bg1 box" span={10}>
          <div style={{ marginTop: "80px" }} className="mt-5">
            <img src="/asset/img/logoalta.png" alt="" />
          </div>
          <Form className="mt-5" name="forget" onFinish={handleSubmit}>
            <div style={{ marginTop: "50px" }}>
              <h1 className="title">Đặt lại mật khẩu</h1>
              <label className="title2">
                Vui lòng nhập lại email để đặt lại mật khẩu của bạn
              </label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ email!",
                  },
                  {
                    type: "email",
                    message: "Địa chỉ email không hợp lệ",
                  },
                ]}
                validateStatus={inputError ? "error" : ""}
                help={inputError ? errorMessage : null}
              >
                <Input
                  className={`login ${inputError ? "error-input" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Item>
            </div>

            <div style={{ marginLeft: "25px" }} className="button-container">
              <Space>
                <Link to="/">
                  <Button
                    className="buttoncancle"
                    type="primary"
                    htmlType="button"
                  >
                    Hủy
                  </Button>
                </Link>

                <Button
                  className="buttonforget"
                  type="primary"
                  htmlType="submit"
                >
                  Tiếp tục
                </Button>
              </Space>
            </div>
          </Form>
        </Col>
        <Col className="" span={14}>
          <img src="/asset/img/bgh.png" alt="" />
        </Col>
      </Row>
    </div>
  );
};

export default Forget;
