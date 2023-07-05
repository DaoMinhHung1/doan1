import React, { useEffect, useState } from "react";
import { Card, Col, Layout, Progress, Row } from "antd";
import "../StylePages/Home.css";
import { BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import SiderComponent from "../Component/SiderComponent";
import CalendarComponent from "../Component/CaclendarComponent";

const { Sider } = Layout;

const Home: React.FC = () => {
  //Tên đăng nhập
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Kiểm tra xem dữ liệu userData có tồn tại trong LocalStorage không
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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
                <Card>
                  <div>
                    <Progress type="circle" size={60} percent={90} />
                    <div className="card-info">
                      <div>
                        <p>200</p>
                      </div>
                      <div>
                        <p>Số thứ tự đã cấp</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card>
                  <div>
                    <Progress type="circle" size={60} percent={90} />
                    <div className="card-info">
                      <div>
                        <p>200</p>
                      </div>
                      <div>
                        <p>Số thứ tự đã cấp</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card>
                  <div>
                    <Progress type="circle" size={60} percent={90} />
                    <div className="card-info">
                      <div>
                        <p>200</p>
                      </div>
                      <div>
                        <p>Số thứ tự đã cấp</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card>
                  <div>
                    <Progress type="circle" size={60} percent={90} />
                    <div className="card-info">
                      <div>
                        <p>200</p>
                      </div>
                      <div>
                        <p>Số thứ tự đã cấp</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
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
            <div className="">
              <BellOutlined
                style={{
                  fontSize: "24px",
                  color: "red",
                  marginLeft: "250px",
                }}
              />
            </div>
          </Col>
          <Col span={8}>
            <img
              style={{ marginTop: "-10px", marginLeft: "70px" }}
              className="imgaccount"
              src="/asset/img/ao2.jpg"
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
        <div
          style={{
            margin: "30px",
            display: "flex",
          }}
          className="titletopbar"
        >
          Tổng quan
        </div>
        <div style={{ marginTop: "5px" }} className="card-dulieusider">
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
        <div style={{ marginTop: "80px" }} className="card-dulieusider">
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
        <div style={{ marginTop: "80px" }} className="card-dulieusider">
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
        <div style={{ marginTop: "100px", marginLeft: "30px" }}>
          <CalendarComponent />
        </div>
      </Sider>
    </Layout>
  );
};

export default Home;
