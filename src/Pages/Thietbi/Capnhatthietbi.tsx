import React, { useEffect, useState } from "react";

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
import { useLocation, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

interface DeviceData {
  matb: string;
  nametb: string;
  addresstb: string;
  hoatdongtb: string;
  ketnoitb: string;
  dichvutb: string;
  id: string;
}

const Capnhatthietbi: React.FC = () => {
  const [deviceData, setDeviceData] = useState<DeviceData>({
    matb: "",
    nametb: "",
    addresstb: "",
    hoatdongtb: "",
    ketnoitb: "",
    dichvutb: "",
    id: "",
  });

  const location = useLocation();
  const device = location.state?.device;
  const [updatedDevice, setUpdatedDevice] = useState(device);
  const { id } = useParams<{ id: string }>();

  const firestore = getFirestore();

  const handleMatbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedDevice((prevState: any) => ({ ...prevState, matb: value }));
  };

  const handleNametbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedDevice((prevState: any) => ({ ...prevState, nametb: value }));
  };

  const handleAddresstbChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setUpdatedDevice((prevState: any) => ({ ...prevState, addresstb: value }));
  };

  useEffect(() => {
    if (device && device.id) {
      const deviceDocRef = doc(firestore, "devices", device.id);
      console.log(deviceDocRef);

      onSnapshot(deviceDocRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data) {
          // Lấy ID từ trường dữ liệu và cập nhật vào updatedDevice
          const idFromData = data.id;
          setUpdatedDevice((prevState: any) => ({
            ...prevState,
            ...data,
            id: idFromData,
          }));
        }
      });
    }
  }, [firestore, device]);

  const handleUpdateDevice = async () => {
    try {
      const deviceCollectionRef = collection(firestore, "devices");
      const querySnapshot = await getDocs(deviceCollectionRef);

      // Tìm tài liệu trong collection "devices" có trường dữ liệu id trùng khớp với updatedDevice.id
      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().id === updatedDevice.id
      );

      if (matchingDocument) {
        // Tạo một đối tượng chứa các trường dữ liệu cần cập nhật
        const updates = {
          matb: updatedDevice.matb,
          nametb: updatedDevice.nametb,
          addresstb: updatedDevice.addresstb,
          dichvutb: updatedDevice.dichvutb,
          hoatdongtb: updatedDevice.hoatdongtb,
        };

        // Cập nhật dữ liệu của thiết bị trong Firestore
        await updateDoc(matchingDocument.ref, updates);
        message.success("Cập nhật thiết bị thành công!");
      } else {
        message.error("Không tìm thấy thiết bị để cập nhật!");
      }
    } catch (error) {
      message.error("Cập nhật dịch vụ thất bại!");
      console.log(error);
      // Xử lý lỗi nếu cần thiết
    }
  };
  console.log(device);
  console.log(updatedDevice.id);

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
                      <Form.Item name="email">
                        <Input
                          defaultValue={device?.matb}
                          className="input-chung"
                          onChange={handleMatbChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Tên thiết bị</label>
                      <Form.Item name="email">
                        <Input
                          defaultValue={device?.nametb}
                          className="input-chung"
                          onChange={handleNametbChange}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Địa chỉ IP</label>
                      <Form.Item name="email">
                        <Input
                          defaultValue={device.addresstb}
                          className="input-chung"
                          onChange={handleAddresstbChange}
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
                          // name="hoatdongtb"
                          value={deviceData.hoatdongtb}
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
                      <Form.Item name="email">
                        <Input className="input-chung" />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Mật khẩu</label>
                      <Form.Item name="email">
                        <Input className="input-chung" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <label>Dịch vụ</label>
                    <Space.Compact block>
                      <Select
                        allowClear
                        mode="multiple"
                        defaultValue="Zhejianggggg"
                        style={{ width: "50%" }}
                      >
                        <Option value="Zhejianggggg">Khám tim mạch</Option>
                        <Option value="Khám sản phụ khoa">
                          Khám sản phụ khoa
                        </Option>
                        <Option value="Khám răng hàm mặt">
                          Khám răng hàm mặt
                        </Option>
                        <Option value="Khám tai mũi họng">
                          Khám tai mũi họng
                        </Option>
                        <Option value="Khám hô hấp">Khám hô hấp</Option>
                        <Option value="Khám tổng quát">Khám tổng quát</Option>
                      </Select>
                    </Space.Compact>
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
                  onClick={handleUpdateDevice}
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

export default Capnhatthietbi;
