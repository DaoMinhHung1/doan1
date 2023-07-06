import React, { useEffect, useState } from "react";

import { Button, Col, Form, Input, Layout, Row, Table } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../../redux/ordernumbersSlice";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

interface OrderNumbers {
  STT: string;
  namekh: string;
  namedv: string;
  startdate: string;
  enddate: string;
  provide: string;
  id: string;
  isActive: boolean;
}
const Quanlycapso: React.FC = () => {
  //Load dữ liệu user
  const [loginData, setLoginData] = useState<{
    name: string;
  } | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setLoginData(userData);
    }
    console.log(storedUserData);
  }, []);

  const history = useHistory();
  const ordernumbers = useSelector(
    (state: RootState) => state.ordernumbers.orderNumbers
  );

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrderNumbers());
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  //Xem chi tiết
  const handleViewDetails = (orderID: string) => {
    const selectedOrder = ordernumbers.find((orders) => orders.id === orderID);
    if (selectedOrder) {
      console.log("Selected order:", selectedOrder);
      history.push(`/chitietcs/${orderID}`, { orders: selectedOrder });
    } else {
      console.log("Không có dữ liệu dịch vụ");
    }
  };
  // Table
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      render: (_text: any, record: OrderNumbers) => (
        <span>{record.namekh || loginData?.name}</span>
      ),
      width: 200,
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
      width: 120,
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "enddate",
      key: "enddate",
      width: 120,
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
      render: (_text: any, record: OrderNumbers) => <span>Hệ thống</span>,
      width: 200,
    },
    {
      title: "",
      dataIndex: "chitietAction",
      key: "chitietAction",
      render: (_text: any, record: OrderNumbers) => (
        <>
          <Button onClick={() => handleViewDetails(record.id)}>Chi tiết</Button>
        </>
      ),
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
                  <h1 className="titletopbar">Quản lý cấp số</h1>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <label>Trạng thái hoạt động</label>
                    <Form.Item name="email">
                      <Input className="form-input" />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={10} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Chọn thời gian</label>
                    <Form.Item name="email">
                      <div className="">
                        <Input className="form-input" />
                      </div>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Từ khóa</label>
                    <Form.Item name="email">
                      <Input className="form-input" />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table<OrderNumbers>
                      columns={columns}
                      dataSource={ordernumbers}
                      pagination={{
                        pageSize: 5,
                        pageSizeOptions: ["5", "10", "15"],
                      }}
                    />
                  </div>
                </Col>
                <Col className="hang-table" span={2}>
                  <HomeOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/capsomoi";
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

export default Quanlycapso;
