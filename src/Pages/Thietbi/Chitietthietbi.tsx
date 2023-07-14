import React from "react";

import { Card, Col, Layout, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useLocation } from "react-router-dom";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { Header } from "antd/es/layout/layout";

const Chitietthietbi: React.FC = () => {
  const location = useLocation();
  const device = location.state?.device;

  // Sử dụng dữ liệu thiết bị trong trang Chitiettb
  console.log("Device:", device.id);

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="chuotren">
                Thiết bị &gt;{" "}
                <span className="chuotren">Danh sách thiết bị</span> &gt;{" "}
                <span className="titletopbar">Chi tiết thiết bị</span>
              </h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách thiết bị</h1>
                </Col>
              </Row>
              <Card className="">
                <h1 className="titletopbar">Thông tin chi tiết</h1>
                <Row>
                  <Col span={4}>
                    <div>
                      <label className="chu" htmlFor="">
                        Mã thiết bị
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Tên thiết bị
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Địa chỉ IP
                      </label>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <label className="chu" htmlFor="">
                        <span>{device.matb}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{device.nametb}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{device.addresstb}</span>
                      </label>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div>
                      <label className="chu " htmlFor="">
                        Loại thiết bị
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Tên đăng nhập
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Mật khẩu
                      </label>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <label className="chu " htmlFor="">
                        <span>{device.loaitb}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{device.tendn}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{device.matkhau}</span>
                      </label>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: "50px" }}>
                  <Col span={24}>
                    <label className="chu " htmlFor="">
                      Dịch vụ sử dụng
                    </label>
                    <p>Khám tim mạch</p>
                  </Col>
                </Row>
              </Card>
              {/* <Col className="hang-table" span={2}>
                  <HomeOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/addtb";
                    }}
                  />
                </Col> */}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Chitietthietbi;
