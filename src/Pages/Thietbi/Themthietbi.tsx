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
  Space,
  message,
} from "antd";

import Sider from "antd/es/layout/Sider";
import { BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { Option } from "antd/es/mentions";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

interface DeviceData {
  matb: string;
  nametb: string;
  addresstb: string;
  loaitb: string;
  dichvutb: string[];
  hoatdongtb: string;
  ketnoitb: string;
  id: string;
}

const Themthietbi: React.FC = () => {
  const [deviceData, setDeviceData] = useState<DeviceData>({
    matb: "",
    nametb: "",
    addresstb: "",
    loaitb: "",
    dichvutb: [],
    hoatdongtb: "",
    ketnoitb: "",
    id: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeviceData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleServiceChange = (value: string[]) => {
    setDeviceData((prevState) => ({ ...prevState, dichvutb: value }));
  };

  const handleAddDevice = async () => {
    try {
      const db = getFirestore();
      const devicesCollection = collection(db, "devices");

      const newID = uuidv4();

      const deviceWithID = { ...deviceData, id: newID };

      await addDoc(devicesCollection, deviceWithID);

      console.log("Thêm thiết bị thành công");
      message.success("Thêm thiết bị thành công!");

      setDeviceData({
        matb: "",
        nametb: "",
        addresstb: "",
        loaitb: "",
        dichvutb: [],
        hoatdongtb: "",
        ketnoitb: "",
        id: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm thiết bị:", error);
      message.error("Lỗi khi thêm thiết bị");
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
                      <label>Mã thiết bị</label>
                      <Form.Item name="mathietbi">
                        <Input
                          className="input-chung"
                          name="matb"
                          value={deviceData.matb}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Tên thiết bị</label>
                      <Form.Item name="ten">
                        <Input
                          className="input-chung"
                          name="nametb"
                          value={deviceData.nametb}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Địa chỉ IP</label>
                      <Form.Item name="ip">
                        <Input
                          className="input-chung"
                          name="addresstb"
                          value={deviceData.addresstb}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <label>Loại thiết bị</label>
                      <Form.Item name="loai">
                        <Select
                          className=""
                          value={deviceData?.loaitb}
                          onChange={(value) =>
                            setDeviceData((prevState) => ({
                              ...prevState,
                              hoatdongtb: value,
                            }))
                          }
                        >
                          <Select.Option value="Kiosk">Kiosk</Select.Option>
                          <Select.Option value="Display counter">
                            Display counter
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div>
                      <label>Tên đăng nhập</label>
                      <Form.Item name="login">
                        <Input
                          className="input-chung"
                          // name="ketnoitb"
                          // value={deviceData.ketnoitb}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Mật khẩu</label>
                      <Form.Item name="password">
                        <Input
                          className="input-chung"
                          // name="dichvutb"
                          // value={deviceData.dichvutb}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label>Dịch vụ</label>
                    <Select
                      allowClear
                      mode="multiple"
                      value={deviceData.dichvutb}
                      onChange={handleServiceChange}
                      style={{ width: "50%" }}
                    >
                      <Select.Option value="Khám tim mạch">
                        Khám tim mạch
                      </Select.Option>
                      <Select.Option value="Khám sản phụ khoa">
                        Khám sản phụ khoa
                      </Select.Option>
                      <Select.Option value="Khám răng hàm mặt">
                        Khám răng hàm mặt
                      </Select.Option>
                      <Select.Option value="Khám tai mũi họng">
                        Khám tai mũi họng
                      </Select.Option>
                      <Select.Option value="Khám hô hấp">
                        Khám hô hấp
                      </Select.Option>
                      <Select.Option value="Khám tổng quát">
                        Khám tổng quát
                      </Select.Option>
                    </Select>
                  </Col>
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
                  onClick={handleAddDevice}
                >
                  Thêm thiết bị
                </Button>
              </Content>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Themthietbi;
