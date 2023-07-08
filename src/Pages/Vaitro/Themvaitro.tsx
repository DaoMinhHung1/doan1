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
import { addDoc, collection, getFirestore } from "firebase/firestore";

interface PositionData {
  namePos: string;
  number: string;
  motadv: string;
}

const Themvaitro: React.FC = () => {
  const [positionData, setPositionData] = useState<PositionData>({
    namePos: "",
    number: "",
    motadv: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPositionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPosition = async () => {
    try {
      const db = getFirestore();
      const positionsCollection = collection(db, "position");

      // Thêm dữ liệu vai trò vào Firestore
      await addDoc(positionsCollection, positionData);

      message.success("Thêm vai trò thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm vai trò:", error);
      message.error("Lỗi khi thêm vai trò");
    }
  };
  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="titletopbar">Vai trò</h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Content style={{ marginLeft: "70px" }}>
            <Row>
              <Col span={24}>
                <h1 className="titletopbar">Quản lý vai trò</h1>
              </Col>
            </Row>
            <Row>
              <Card style={{ marginTop: "-10px" }} className="card-1">
                <div>
                  <h1 style={{ marginTop: "-10px" }} className="titletopbar">
                    Thông tin vai trò
                  </h1>
                  <Row>
                    <Col span={12}>
                      <div>
                        <label>Tên vai trò</label>
                        <Form.Item>
                          <Input
                            name="namePos"
                            className="input-chung"
                            style={{ width: "530px" }}
                            value={positionData.namePos}
                            onChange={handleInputChange}
                          />
                        </Form.Item>
                      </div>
                      <div>
                        <label htmlFor="description">Mô tả:</label>
                        <Input.TextArea
                          rows={6}
                          id="description"
                          name="motadv"
                          style={{ width: "560px" }}
                          value={positionData.motadv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Col>
                    <Col
                      style={{ marginLeft: "40px", marginTop: "-40px" }}
                      span={10}
                    >
                      <h1>Phân quyền chức năng</h1>
                      <Card style={{ background: "#FFF2E7" }}>
                        <div>
                          <h1>Nhóm chức năng A</h1>
                          <div>
                            <Checkbox>Tất cả</Checkbox>
                          </div>
                          <div>
                            <Checkbox style={{ marginTop: "5px" }}>
                              Chức năng x
                            </Checkbox>
                          </div>
                          <div>
                            <Checkbox style={{ marginTop: "5px" }}>
                              Chức năng y
                            </Checkbox>
                          </div>
                          <div>
                            <Checkbox style={{ marginTop: "5px" }}>
                              Chức năng z
                            </Checkbox>
                          </div>
                        </div>
                        <div>
                          <h1>Nhóm chức năng B</h1>
                          <div>
                            <Checkbox>Tất cả</Checkbox>
                          </div>
                          <div>
                            <Checkbox style={{ marginTop: "5px" }}>
                              Chức năng x
                            </Checkbox>
                          </div>
                          <div>
                            <Checkbox style={{ marginTop: "5px" }}>
                              Chức năng y
                            </Checkbox>
                          </div>
                          <div>
                            <Checkbox style={{ marginTop: "5px" }}>
                              Chức năng z
                            </Checkbox>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
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
                  onClick={handleAddPosition}
                >
                  Thêm
                </Button>
              </Content>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Themvaitro;
