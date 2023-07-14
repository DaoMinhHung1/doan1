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
  Space,
  message,
} from "antd";

import { Content, Header } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import { Option } from "antd/es/mentions";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
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

const Capnhatthietbi: React.FC = () => {
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

  const location = useLocation();
  const device = location.state?.device;
  const [updatedDevice, setUpdatedDevice] = useState(device);
  const storedUserData = localStorage.getItem("userData");
  const [loginData, setLoginData] = useState<{
    namedn: string;
  } | null>(storedUserData ? JSON.parse(storedUserData) : null);

  const firestore = getFirestore();

  const handleMatbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedDevice((prevState: any) => ({ ...prevState, matb: value }));
  };

  const handleNametbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedDevice((prevState: any) => ({ ...prevState, nametb: value }));
  };
  const handleLoaitbChange = (value: string) => {
    setUpdatedDevice((prevState: any) => ({
      ...prevState,
      loaitb: value,
    }));
  };

  const handleDichvutbChange = (value: string) => {
    setUpdatedDevice((prevState: any) => ({
      ...prevState,
      dichvutb: value,
    }));
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

      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().id === updatedDevice.id
      );

      if (matchingDocument) {
        const updates = {
          matb: updatedDevice.matb,
          nametb: updatedDevice.nametb,
          addresstb: updatedDevice.addresstb,
          loaitb: updatedDevice.loaitb,
          dichvutb: updatedDevice.dichvutb,
          hoatdongtb: updatedDevice.hoatdongtb,
        };

        await updateDoc(matchingDocument.ref, updates);

        //Lưu nhật kí
        const userLog = {
          email: loginData?.namedn,
          thoiGian: moment().format("DD-MM-YYYY HH:mm:ss"),
          hanhDong: "Cập nhật thiết bị: " + updatedDevice.matb,
          bang: "Thiet bi",
        };

        const diaryCollection = collection(firestore, "diary");
        await addDoc(diaryCollection, {
          ...userLog,
          createdAt: serverTimestamp(),
        });
        message.success("Cập nhật thiết bị thành công!");
      } else {
        message.error("Không tìm thấy thiết bị để cập nhật!");
      }
    } catch (error) {
      message.error("Cập nhật thiết bị thất bại!");
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="chuotren">
                Thiết bị &gt;{" "}
                <span className="chuotren">Danh sách thiết bị</span> &gt;{" "}
                <span className="titletopbar">Cập nhật thiết bị</span>
              </h1>
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
                          defaultValue={device.loaitb}
                          onChange={handleLoaitbChange}
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
                        <Input
                          className="input-chung"
                          defaultValue={device.tendn}
                        />
                      </Form.Item>
                    </div>

                    <div>
                      <label>Mật khẩu</label>
                      <Form.Item name="email">
                        <Input
                          className="input-chung"
                          defaultValue={device.matkhau}
                        />
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
                        defaultValue={device.dichvutb}
                        style={{ width: "100%" }}
                        onChange={handleDichvutbChange}
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
