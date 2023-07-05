import React, { useEffect, useState } from "react";

import { Col, Form, Layout, Row, Table } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { getDatabase, onValue, ref } from "firebase/database";
import { DatePicker } from "antd";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

const { RangePicker } = DatePicker;

interface OrderNumbers {
  STT: string;
  namekh: string;
  namedv: string;
  startdate: string;
  enddate: string;
  provide: string;
  uuid: string;
  isActive: boolean;
}
const Quanlybaocao: React.FC = () => {
  const [order, setOrder] = useState<OrderNumbers[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const orderRef = ref(db, "ordernumbers");

        onValue(orderRef, (snapshot) => {
          const data: OrderNumbers[] = [];
          snapshot.forEach((childSnapshot) => {
            const order = childSnapshot.val() as OrderNumbers;
            data.push(order);
          });
          setOrder(data);
        });
      } catch (error) {
        console.error("Error fetching service data:", error);
      }
    };

    fetchData();
  }, []);

  // Table
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      with: 150,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "namedv",
      key: "namedv",
      width: 200,
    },
    {
      title: "Thời gian cấp",
      dataIndex: "startdate",
      key: "startdate",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Hoạt động" : "Bỏ qua"}
        </span>
      ),
    },
    {
      title: "Nguồn cấp",
      dataIndex: "provide",
      key: "provide",
      render: (text: any, record: OrderNumbers) => <span>Hệ thống</span>,
      width: 200,
    },
  ];

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách dịch vụ</h1>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <Form.Item name="range-picker" label="Chọn thời gian">
                      <RangePicker />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table columns={columns} dataSource={order} />
                  </div>
                </Col>
                <Col className="hang-table" span={2}>
                  <HomeOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/themdichvu";
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

export default Quanlybaocao;
