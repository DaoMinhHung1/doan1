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
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import { serverTimestamp } from "firebase/database";

interface Services {
  madv: string;
  namedv: string;
  dessdv: string;
  hoatdongdv: string;
  maso: string;
  id: string;
}
const Themdichvu: React.FC = () => {
  const [serviceData, setServiceData] = useState<Services>({
    madv: "",
    namedv: "",
    dessdv: "",
    hoatdongdv: "Đang thực hiện",
    maso: "",
    id: "",
  });

  const [checked, setChecked] = useState<number | null>(null);
  const [nextMaso, setNextMaso] = useState<number | null>(null);
  const [addedDocId, setAddedDocId] = useState<string | null>(null);

  const storedUserData = localStorage.getItem("userData");
  const [loginData, setLoginData] = useState<{
    namedn: string;
  } | null>(storedUserData ? JSON.parse(storedUserData) : null);

  useEffect(() => {
    const storedMaso = localStorage.getItem("maso");
    if (storedMaso) {
      setNextMaso(parseInt(storedMaso, 10) + 1);
    } else {
      setNextMaso(2000000);
    }
  }, []);

  const handleCheckboxChange = (index: number) => {
    setChecked(index);

    if (index === 1) {
      setServiceData((prevState) => ({ ...prevState, maso: "0001 - 9999" }));
    } else {
      setServiceData((prevState) => ({ ...prevState, maso: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setServiceData((prevState) => ({
      ...prevState,
      namedv: value,
    }));
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

  useEffect(() => {
    if (addedDocId) {
      setServiceData((prevState) => ({
        ...prevState,
        id: addedDocId,
      }));
    }
  }, [addedDocId]);

  const handleAddService = async () => {
    try {
      const db = getFirestore();
      const servicesCollection = collection(db, "services");

      let maso = "";
      if (checked === 1) {
        if (nextMaso !== null) {
          maso = nextMaso.toString();
          setNextMaso(nextMaso + 1);
          localStorage.setItem("maso", nextMaso.toString());
        }
      }

      const serviceWithID = { ...serviceData, maso };

      const addedDocRef = await addDoc(servicesCollection, serviceWithID);
      const addedDocId = addedDocRef.id;

      // Ghi thông tin nhật ký người dùng
      const userLog = {
        email: loginData?.namedn,
        thoiGian: moment().format("DD-MM-YYYY HH:mm:ss"),
        hanhDong: "Thêm dịch vụ : " + serviceData.madv,
        bang: "Dịch vụ",
      };

      const diaryCollection = collection(db, "diary");
      await addDoc(diaryCollection, {
        ...userLog,
        createdAt: serverTimestamp(),
      });

      console.log("Thêm dịch vụ thành công");
      message.success("Thêm dịch vụ thành công!");

      setAddedDocId(addedDocId);
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      message.error("Lỗi khi thêm dịch vụ");
    }
  };

  useEffect(() => {
    if (addedDocId) {
      const now = moment();
      const targetTime = moment().set({ hour: 17, minute: 30, second: 0 });
      const timeDiff = targetTime.diff(now, "milliseconds");

      if (timeDiff > 0) {
        const timer = setTimeout(async () => {
          const db = getFirestore();
          const servicesCollection = collection(db, "services");
          const updatedService = { hoatdongdv: "Đã hoàn thành" };
          await updateDoc(doc(servicesCollection, addedDocId), updatedService);
          console.log(addedDocId);

          // Cập nhật trạng thái dịch vụ trong React state
          setServiceData((prevState) => ({
            ...prevState,
            hoatdongdv: "Đã hoàn thành",
          }));
        }, timeDiff);

        return () => clearTimeout(timer);
      }
    }
  }, [addedDocId]);

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="chuotren">
                Dịch vụ &gt; <span className="chuotren">Danh sách dịch vụ</span>{" "}
                &gt;
                <span className="titletopbar">Thêm dịch vụ</span>
              </h1>
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
                          value={serviceData.madv}
                          onChange={handleInputChange}
                        />
                      </Form.Item>
                    </div>

                    <div style={{ marginTop: "30px" }}>
                      <label>Tên dịch vụ</label>
                      <Form.Item>
                        <Select
                          style={{ width: "450px" }}
                          className="select-chung"
                          onChange={handleSelectChange}
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
                        // value={serviceData.dessdv}
                        onChange={handleInputAreaChange}
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
