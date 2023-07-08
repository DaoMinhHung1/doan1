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

import { Content, Header } from "antd/es/layout/layout";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import moment from "moment";
import { serverTimestamp } from "firebase/database";

interface DeviceData {
  matb: string;
  nametb: string;
  addresstb: string;
  loaitb: string;
  dichvutb: string[];
  hoatdongtb: string;
  ketnoitb: string;
  tendn: string;
  matkhau: string;
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
    tendn: "",
    matkhau: "",
    id: "",
  });

  const [loginData, setLoginData] = useState<{
    namedn: string;
    password: string;
  } | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeviceData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleServiceChange = (value: string[]) => {
    setDeviceData((prevState) => ({ ...prevState, dichvutb: value }));
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setLoginData(userData);
    }
    console.log(storedUserData);
  }, []);

  const handleAddDevice = async () => {
    if (loginData) {
      console.log(loginData);
      const namedn = loginData.namedn;
      const password = loginData.password;
      if (namedn === deviceData.tendn && password === deviceData.matkhau) {
        try {
          const db = getFirestore();
          const devicesCollection = collection(db, "devices");

          const newID = uuidv4();
          const deviceWithID = {
            ...deviceData,
            id: newID,
            hoatdongtb: "Hoạt động",
          }; // Set hoatdongtb to "Hoạt động"
          await addDoc(devicesCollection, deviceWithID);

          //Ghi lại hành động vào diary
          const userLog = {
            email: loginData?.namedn,
            thoiGian: moment().format("DD-MM-YYYY HH:mm:ss"),
            hanhDong: "Thêm thiết bị : " + deviceData.matb,
            bang: "Thiet bi",
          };

          const diaryCollection = collection(db, "diary");
          await addDoc(diaryCollection, {
            ...userLog,
            createdAt: serverTimestamp(),
          });

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
            tendn: "",
            matkhau: "",
            id: "",
          });

          // Set hoatdongtb to "ngừng hoạt động" after 5 minutes
          setTimeout(() => {
            setDeviceData((prevState) => ({
              ...prevState,
              hoatdongtb: "ngừng hoạt động",
            }));
          }, 5 * 60 * 1000); // 5 minutes in milliseconds
        } catch (error) {
          console.error("Lỗi khi thêm thiết bị:", error);
          message.error("Lỗi khi thêm thiết bị");
        }
      } else {
        message.error("Vui lòng nhập đúng tên đăng nhập và mật khẩu");
      }
    } else {
      message.error("Không tìm thấy thông tin đăng nhập");
    }
  };

  console.log(deviceData.tendn);

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="titletopbar">Thiết bị</h1>
            </Col>
            <HeaderComponent />
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
                              loaitb: value,
                            }))
                          }
                          style={{ width: 450 }}
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
                      <Form.Item name="tendn">
                        <Input
                          className="input-chung"
                          value={deviceData?.tendn}
                          name="tendn"
                          // name="ketnoitb"
                          // value={deviceData.ketnoitb}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Mật khẩu</label>
                      <Form.Item name="matkhau">
                        <Input
                          className="input-chung"
                          value={deviceData?.matkhau}
                          name="matkhau"
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
                    <Row>
                      <label>Dịch vụ</label>
                    </Row>

                    <Select
                      allowClear
                      mode="multiple"
                      value={deviceData.dichvutb}
                      onChange={handleServiceChange}
                      style={{ width: "100%" }}
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
                  onClick={() => (window.location.href = "/thietbi")}
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
