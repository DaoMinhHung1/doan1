import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Layout, Row, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

interface PositionData {
  namePos: string;
  number: number;
  motadv: string;
}

const Vaitro: React.FC = () => {
  const [positionList, setPositionList] = useState<PositionData[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const positionsCollection = collection(db, "position");

    const unsubscribe = onSnapshot(positionsCollection, (snapshot) => {
      const positionsMap: { [namePos: string]: PositionData } = {};

      snapshot.forEach((doc) => {
        const data = doc.data() as PositionData;
        const { namePos } = data;

        // Tăng số lượng khi dữ liệu mới trùng namePos
        if (positionsMap[namePos]) {
          positionsMap[namePos].number++;
        } else {
          positionsMap[namePos] = { ...data, number: 1 };
        }
      });

      // Chuyển đổi positionsMap thành mảng positions
      const positions = Object.values(positionsMap);

      setPositionList(positions);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdatePosition = (id: string) => {
    // Xử lý cập nhật dựa trên id của tài liệu Firestore
    console.log("Cập nhật vai trò với id:", id);
  };

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "namePos",
      key: "namePos",
      width: 150,
    },
    {
      title: "Số người dùng",
      dataIndex: "number",
      key: "number",
      width: 200,
      render: (text: number) => <span>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "motadv",
      key: "motadv",
      width: 300,
    },
    {
      title: " ",
      dataIndex: "updateAction",
      key: "updateAction",
      width: 150,
      render: (_: any, record: PositionData) => (
        <Button type="primary">Cập nhật</Button>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col style={{ marginLeft: "-17px" }} span={15}>
              <h1 className="chuotren">
                Cài đặt hệ thống &gt;{" "}
                <span className="titletopbar">Quản lý vai trò</span>
              </h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content style={{ marginTop: "-20px" }}>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách vai trò</h1>
                </Col>
              </Row>
              <Row>
                <Col
                  span={24}
                  style={{
                    marginLeft: "-100px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <div className="form-thietbi form-item">
                    <label>Từ khóa</label>
                    <Form.Item name="email">
                      <Input
                        className="form-input"
                        placeholder="Nhập từ khóa"
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "-30px" }}>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table<PositionData>
                      rowClassName={(record, index) =>
                        index % 2 === 0 ? "table-row-even" : "table-row-odd"
                      }
                      columns={columns}
                      className="custom-table"
                      style={{ height: "50px" }}
                      dataSource={positionList}
                      pagination={{
                        pageSize: 6,
                        pageSizeOptions: ["5", "10", "15"],
                      }}
                    />
                  </div>
                </Col>
                <Col
                  style={{ marginTop: "20px" }}
                  className="hang-table icon-thietbi"
                  span={2}
                >
                  <HomeOutlined
                    onClick={() => {
                      window.location.href = "/themvaitro";
                    }}
                  />
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Vaitro;
