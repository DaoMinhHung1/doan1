import React, { useEffect, useState } from "react";
import { Col, Layout, Row, Table } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

interface DiaryData {
  email: string;
  hanhDong: string;
  thoiGian: string;
  bang: string;
}

const Quanlynguoidung: React.FC = () => {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const diaryCollection = collection(db, "diary");

    const unsubscribe = onSnapshot(diaryCollection, (snapshot) => {
      const data: DiaryData[] = [];
      snapshot.forEach((doc) => {
        const diaryEntry = doc.data() as DiaryData;
        const date = new Date(diaryEntry.thoiGian);
        diaryEntry.thoiGian = date.toLocaleString(); // Chuyển đổi thành chuỗi ngày và giờ
        data.push(diaryEntry);
      });
      setDiaryData(
        data.sort(
          (a, b) =>
            new Date(b.thoiGian).getTime() - new Date(a.thoiGian).getTime()
        )
      ); // Sắp xếp mảng dựa trên trường thoiGian (mới nhất đến cũ nhất)
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, []);
  // Table columns
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Thời gian tác động",
      dataIndex: "thoiGian",
      key: "thoiGian",
      width: 200,
    },
    {
      title: "IP thực hiện",
      dataIndex: "dessdv",
      key: "dessdv",
      render: (text: string) => "127.0.0.1",
      width: 200,
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "hanhDong",
      key: "hanhDong",
      width: 200,
    },
  ];

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="titletopbar">Nhật ký người dùng</h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách dịch vụ</h1>
                </Col>
              </Row>
              <Row>{/* Form components */}</Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table<DiaryData>
                      columns={columns}
                      className="custom-table"
                      dataSource={diaryData}
                      pagination={{
                        pageSize: 5,
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
                      window.location.href = "/themdv";
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

export default Quanlynguoidung;
