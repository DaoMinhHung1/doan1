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
  message,
} from "antd";

import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

const Capnhatdichvu: React.FC = () => {
  const [checked, setChecked] = useState<number | null>(null);
  const handleCheckboxChange = (index: number) => {
    setChecked(index);
  };

  const location = useLocation();
  const service = location.state?.service;
  const [updatedService, setUpdatedService] = useState(service);
  console.log(updatedService);

  const firestore = getFirestore();

  const handleMadvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedService((prevState: any) => ({ ...prevState, madv: value }));
  };

  const handleNamedvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatedService((prevState: any) => ({ ...prevState, namedv: value }));
  };

  const handleDessdvChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setUpdatedService((prevState: any) => ({ ...prevState, dessdv: value }));
  };

  useEffect(() => {
    if (service && service.id) {
      const serviceDocRef = doc(firestore, "services", service.id);
      console.log(serviceDocRef);

      onSnapshot(serviceDocRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data) {
          // Lấy ID từ trường dữ liệu và cập nhật vào updatedService
          const idFromData = data.id;
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

      // Tìm tài liệu trong collection "services" có trường dữ liệu id trùng khớp với updatedService.id
      const matchingDocument = querySnapshot.docs.find(
        (doc) => doc.data().id === updatedService.id
      );

      if (matchingDocument) {
        // Tạo một đối tượng chứa các trường dữ liệu cần cập nhật
        const updates = {
          madv: updatedService.madv,
          namedv: updatedService.namedv,
          dessdv: updatedService.dessdv,
          hoatdongdv: updatedService.hoatdongdv,
        };

        // Cập nhật dữ liệu của dịch vụ trong Firestore
        await updateDoc(matchingDocument.ref, updates);
        message.success("Cập nhật dịch vụ thành công!");
      } else {
        message.error("Không tìm thấy dịch vụ để cập nhật!");
      }
    } catch (error) {
      message.error("Cập nhật dịch vụ thất bại!");
      console.log(error);
      // Xử lý lỗi nếu cần thiết
    }
  };

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
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
                        <Input
                          name="namedv"
                          className="input-chung"
                          defaultValue={service?.namedv}
                          onChange={handleNamedvChange}
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
