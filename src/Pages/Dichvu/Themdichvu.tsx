import React, { useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Row,
  message,
} from "antd";

import Sider from "antd/es/layout/Sider";
import { BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";

interface Services {
  madv: string;
  namedv: string;
  dessdv: string;
  hoatdongdv: string;
  id: string;
}
const Themdichvu: React.FC = () => {
  const [serviceData, setServiceData] = useState<Services>({
    madv: "",
    namedv: "",
    dessdv: "",
    hoatdongdv: "",
    id: "",
  });

  const [checked, setChecked] = useState<number | null>(null);

  const handleCheckboxChange = (index: number) => {
    setChecked(index);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setServiceData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleInputAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setServiceData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddService = async () => {
    try {
      const db = getFirestore();
      const servicesCollection = collection(db, "services");

      const newID = uuidv4();

      const serviceWithID = { ...serviceData, id: newID };

      await addDoc(servicesCollection, serviceWithID);

      console.log("Thêm dịch vụ thành công");
      message.success("Thêm dịch vụ thành công!");

      setServiceData({
        madv: "",
        namedv: "",
        dessdv: "",
        hoatdongdv: "",
        id: "",
      });
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      message.error("Lỗi khi thêm dịch vụ");
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
                      <label>Mã dịch vụ</label>
                      <Form.Item>
                        <Input
                          name="madv"
                          className="input-chung"
                          value={serviceData.madv}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <label>Tên dịch vụ</label>
                      <Form.Item>
                        <Input
                          name="namedv"
                          className="input-chung"
                          value={serviceData.namedv}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <label htmlFor="description">Mô tả:</label>
                      <Input.TextArea
                        rows={6}
                        id="description"
                        name="dessdv"
                        // value={serviceData.dessdv}
                        onChange={handleInputAreaChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <h1 className="titletopbar">Quy tắc cấp số</h1>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div>
                      <Checkbox
                        checked={checked === 1}
                        onChange={() => handleCheckboxChange(1)}
                      >
                        Tăng tự động từ
                      </Checkbox>
                      <Input
                        style={{ width: "60px" }}
                        value={"0001"}
                        readOnly
                      />
                      <span style={{ marginLeft: "10px" }}>đến</span>
                      <Input
                        style={{ width: "60px", marginLeft: "10px" }}
                        value={"9999"}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                  <Col span={24}>
                    <div>
                      <Checkbox
                        checked={checked === 2}
                        onChange={() => handleCheckboxChange(2)}
                      >
                        Prefix
                      </Checkbox>
                      <Input
                        style={{ width: "60px" }}
                        value={"0001"}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                  <Col span={24}>
                    <div>
                      <Checkbox
                        checked={checked === 3}
                        onChange={() => handleCheckboxChange(3)}
                      >
                        Surfix
                      </Checkbox>
                      <Input
                        style={{ width: "60px" }}
                        value={"0001"}
                        readOnly
                      />
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                  <Col span={24}>
                    <div>
                      <Checkbox
                        checked={checked === 4}
                        onChange={() => handleCheckboxChange(4)}
                      >
                        Reset mỗi ngày
                      </Checkbox>
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                  <Col span={24}>
                    <div>
                      <p>Là trường bắt buộc mỗi ngày</p>
                    </div>
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
                  onClick={handleAddService}
                >
                  Thêm dịch vụ
                </Button>
              </Content>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Themdichvu;
