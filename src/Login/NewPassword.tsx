import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { getAuth, confirmPasswordReset } from "firebase/auth";

interface RouteParams {
  oobCode: string;
}

const NewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get("oobCode");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrorMessage("");
    setInputError(false);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
    setInputError(false);
  };

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setErrorMessage("Vui lòng nhập mật khẩu và xác nhận mật khẩu!");
      setInputError(true);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      setInputError(true);
      return;
    }

    if (!oobCode) {
      setErrorMessage("Mã oobCode không tồn tại!");
      setInputError(true);
      return;
    }

    try {
      const auth = getAuth();
      await confirmPasswordReset(auth, oobCode, password);

      setErrorMessage("Đặt lại mật khẩu thành công!");
      message.success("Đặt lại mật khẩu thành công");
      setInputError(false);
    } catch (error) {
      console.log(error);
      setErrorMessage("Đặt lại mật khẩu không thành công. Vui lòng thử lại!");
      setInputError(true);
    }
  };

  useEffect(() => {
    console.log(oobCode); // In giá trị oobCode ra màn hình
  }, [oobCode]);

  return (
    <div>
      <Row>
        <Col className="bg1 box" span={10}>
          <div className="mt-5">
            <img src="/asset/img/logoalta.png" alt="" />
          </div>
          <Form className="mt-5" name="newpass" onFinish={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <h1 className="title">Đặt lại mật khẩu</h1>
              <label className="title2">Vui lòng nhập mật khẩu mới</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
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
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu!",
                  },
                ]}
                validateStatus={inputError ? "error" : ""}
                help={inputError ? errorMessage : null}
              >
                <Input.Password
                  className={`login ${inputError ? "error-input" : ""}`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </Form.Item>
            </div>

            <div className="button-container mt-5">
              <Button
                className="buttonconfirm"
                type="primary"
                htmlType="submit"
              >
                Xác nhận
              </Button>
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

export default NewPass;
