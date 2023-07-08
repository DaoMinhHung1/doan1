import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  message,
} from "antd";

import { Content, Header } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
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
import { serverTimestamp } from "firebase/database";
import moment from "moment";

interface Services {
  madv: string;
  namedv: string;
  dessdv: string;
  hoatdongdv: string;
  maso: string;
  id: string;
}
const Capnhatdichvu: React.FC = () => {
  const [serviceData, setSeviceData] = useState<Services>({
    madv: "",
    namedv: "",
    dessdv: "",
    hoatdongdv: "",
    maso: "",
    id: "",
  });
  const [checked, setChecked] = useState<number | null>(null);
  const handleCheckboxChange = (index: number) => {
    setChecked(index);
  };

  const location = useLocation();
  const service = location.state?.service;
  const [updatedService, setUpdatedService] = useState(service);
  const storedUserData = localStorage.getItem("userData");
  const [loginData, setLoginData] = useState<{
    namedn: string;
  } | null>(storedUserData ? JSON.parse(storedUserData) : null);
  const firestore = getFirestore();

  const handleMadvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedService((prevState: any) => ({ ...prevState, madv: value }));
  };

  const handleNamedvChange = (value: string) => {
    setUpdatedService((prevState: any) => ({
      ...prevState,
      namedv: value,
    }));
  };

  const handleDessdvChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setUpdatedService((prevState: any) => ({ ...prevState, dessdv: value }));
  };

  useEffect(() => {
    if (service && service.maso) {
      const serviceDocRef = doc(firestore, "services", service.maso);
      console.log(serviceDocRef);

      onSnapshot(serviceDocRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data) {
          // Lấy ID từ trường dữ liệu và cập nhật vào updatedService
          const idFromData = data.maso;
          setUpdatedService((prevState: any) => ({
            ...prevState,
            ...data,
            id: idFromData,
          }));
        }
      });
    }
  }, [firestore, service]);

  const handleUpdateService = async () => {
    try {
      const serviceCollectionRef = collection(firestore, "services");
      const querySnapshot = await getDocs(serviceCollectionRef);

      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().maso === updatedService.maso
      );

      if (matchingDocument) {
        const updates = {
          madv: updatedService.madv,
          namedv: updatedService.namedv, // Update namedv field
          dessdv: updatedService.dessdv,
          hoatdongdv: updatedService.hoatdongdv,
        };

        await updateDoc(matchingDocument.ref, updates);

        // Ghi thông tin nhật ký người dùng
        const userLog = {
          email: loginData?.namedn,
          thoiGian: moment().format("DD-MM-YYYY HH:mm:ss"),
          hanhDong: "Cập nhật dịch vụ: " + updatedService.madv,
          bang: "Dịch vụ",
        };

        const diaryCollection = collection(firestore, "diary");
        await addDoc(diaryCollection, {
          ...userLog,
          createdAt: serverTimestamp(),
        });
        message.success("Cập nhật dịch vụ thành công!");
      } else {
        message.error("Không tìm thấy dịch vụ để cập nhật!");
      }
    } catch (error) {
      message.error("Cập nhật dịch vụ thất bại!");
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
              <h1 className="titletopbar">Dịch vụ</h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Content style={{ marginLeft: "70px" }}>
            <Row>
              <Col span={24}>
                <h1 className="titletopbar">Quản lý dịch vụ</h1>
              </Col>
            </Row>
            <Row>
              <Card style={{ marginTop: "-10px" }} className="card-1">
                <h1 style={{ marginTop: "-10px" }} className="titletopbar">
                  Thông tin chi tiết
                </h1>
                <Row>
                  <Col span={12}>
                    <div>
                      <label>Mã dịch vụ</label>
                      <Form.Item>
                        <Input
                          name="madv"
                          className="input-chung"
                          defaultValue={service?.madv}
                          onChange={handleMadvChange}
                        />
                      </Form.Item>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <label>Tên dịch vụ</label>
                      <Form.Item>
                        <Select
                          style={{ width: "450px" }}
                          className="select-chung"
                          defaultValue={service?.namedv}
                          onChange={handleNamedvChange}
                        >
                          <Select.Option value="Khám tim mạch">
                            Khám tim mạch
                          </Select.Option>
                          <Select.Option value="Khám sản - Phụ khoa">
                            Khám sản - Phụ khoa
                          </Select.Option>
                          <Select.Option value="Khám răng hàm mặt">
                            Khám răng hàm mặt
                          </Select.Option>
                          <Select.Option value="Khám tai mũi họng">
                            Khám tai mũi họng
                          </Select.Option>
                        </Select>
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
                        defaultValue={service?.dessdv}
                        onChange={handleDessdvChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <h1 style={{ marginTop: "-10px" }} className="titletopbar">
                      Quy tắc cấp số
                    </h1>
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
                  onClick={() => (window.location.href = "/dichvu")}
                >
                  Hủy bỏ
                </Button>
                <Button
                  style={{ margin: "5px" }}
                  className="btn-thietbi"
                  onClick={handleUpdateService}
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

export default Capnhatdichvu;
