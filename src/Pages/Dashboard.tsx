import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Layout,
  Progress,
  Row,
  Form,
  Select,
  Menu,
  Dropdown,
} from "antd";
import "../StylePages/Home.css";
import { BellOutlined, CalendarOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import SiderComponent from "../Component/SiderComponent";
import CalendarComponent from "../Component/CaclendarComponent";
import { Line } from "@ant-design/charts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../redux/ordernumbersSlice";
const { Sider } = Layout;

const Home: React.FC = () => {
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

  const menu = (
    <Menu
      style={{ maxHeight: "200px", overflowY: "scroll", background: "#FFF2E7" }}
    >
      {ordernumbers.map((order) => (
        <Menu.Item
          key={order.id}
          style={{
            height: "50px",
            width: "250px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <div style={{ background: "white" }}>
            <p>Người dùng: {order.namekh} </p>
            <p>Thời gian nhận số: {order.enddate}</p>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  //Tên đăng nhập
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Kiểm tra xem dữ liệu userData có tồn tại trong LocalStorage không
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const data = [
    { month: "1", value: 100 },
    { month: "2", value: 200 },
    { month: "3", value: 150 },
    { month: "4", value: 350 },
    { month: "5", value: 250 },
    { month: "6", value: 400 },
    { month: "7", value: 400 },
    { month: "8", value: 380 },
    { month: "9", value: 370 },
    { month: "10", value: 490 },
    { month: "11", value: 350 },
    { month: "12", value: 200 },
  ];

  const config = {
    data: data,
    xField: "month",
    yField: "value",
    height: 280,
    smooth: true,
    lineStyle: {
      lineWidth: 2, // Độ dày đường
      stroke: "#1890ff", // Màu xanh dương
    },
  };

  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <Header className="account bgheader">
          <Col span={15}>
            <h1 className="titletopbar">Dashboard</h1>
          </Col>
        </Header>
        <Layout>
          <Content>
            <h1
              style={{ marginLeft: "70px", marginTop: "-20px" }}
              className="titletopbar"
            >
              Biểu đồ cấp số
            </h1>
            <div className="card-dashboard-container">
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px" }}>
                  <div>
                    <CalendarOutlined />
                    <span style={{ marginLeft: "10px" }}>Số thứ tự đã cấp</span>
                  </div>
                  <div>
                    <p>200</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px" }}>
                  <div>
                    <CalendarOutlined />
                    <span style={{ marginLeft: "10px" }}>Số thứ tự đã cấp</span>
                  </div>
                  <div>
                    <p>200</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px" }}>
                  <div>
                    <CalendarOutlined />
                    <span style={{ marginLeft: "10px" }}>Số thứ tự đã cấp</span>
                  </div>
                  <div>
                    <p>200</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px" }}>
                  <div>
                    <CalendarOutlined />
                    <span style={{ marginLeft: "10px" }}>Số thứ tự đã cấp</span>
                  </div>
                  <div>
                    <p>200</p>
                  </div>
                </Card>
              </div>
            </div>
          </Content>
          <Content
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-40px",
            }}
          >
            <Card style={{ width: "90%", height: "450px" }}>
              <Row>
                <Col style={{ marginTop: "-30px" }} span={20}>
                  <h1>Bảng thống kê theo tháng</h1>
                  <p>11/2023</p>
                </Col>
                <Col span={4}>
                  <div className="">
                    <span>Chọn theo</span>
                    <Form.Item name="email">
                      <Select style={{ width: "100px" }}>
                        <Select.Option value="Ngày">Ngày</Select.Option>
                        <Select.Option value="Tuần">Tuần</Select.Option>
                        <Select.Option value=" Tháng">Tháng</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Line {...config} />
            </Card>
          </Content>
        </Layout>
      </Layout>
      <Sider
        className="barbenphai"
        width={401}
        style={{ backgroundColor: "#fff" }}
      >
        <Row style={{ marginTop: "20px", marginLeft: "-150px" }}>
          <Col span={10}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <BellOutlined
                style={{
                  fontSize: "24px",
                  color: "red",
                  marginLeft: "200px",
                }}
              />
            </Dropdown>
          </Col>
          <Col span={8}>
            <img
              style={{ marginTop: "-10px", marginLeft: "70px" }}
              className="imgaccount"
              src={userData?.avatar}
              alt=""
            />
          </Col>
          <Col style={{ marginLeft: "-15px" }} className="" span={6}>
            <p className="xc">xin chào</p>
            <p style={{ marginTop: "-15px" }} className="name">
              {userData?.namedn}
            </p>
          </Col>
        </Row>
        <Row>
          <div
            style={{
              margin: "30px",
              display: "flex",
            }}
            className="titletopbar"
          >
            Tổng quan
          </div>
          <div style={{ marginTop: "-30px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress type="circle" size={60} percent={90} />
                <div className="card-info">
                  <div>
                    <p>4.100</p>
                    <p>Thiết bị</p>
                  </div>
                  <div>
                    <p>Đang hoạt động</p>
                    <p>Ngưng hoạt động</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "60px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress type="circle" size={60} percent={90} />
                <div className="card-info">
                  <div>
                    <p>4.100</p>
                    <p>Thiết bị</p>
                  </div>
                  <div>
                    <p>Đang hoạt động</p>
                    <p>Ngưng hoạt động</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "65px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress type="circle" size={60} percent={90} />
                <div className="card-info">
                  <div>
                    <p>4.100</p>
                    <p>Thiết bị</p>
                  </div>
                  <div>
                    <p>Đang hoạt động</p>
                    <p>Ngưng hoạt động</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "80px", marginLeft: "30px" }}>
            <CalendarComponent />
          </div>
        </Row>
      </Sider>
    </Layout>
  );
};

export default Home;
