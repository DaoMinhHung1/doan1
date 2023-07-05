import React from "react";

import { Card, Col, Layout, Row } from "antd";

import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

const Thongtincapso: React.FC = () => {
  const location = useLocation();
  const orders = location.state?.orders;

  console.log(orders);

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
                  <h1 className="titletopbar">Danh sách thiết bị</h1>
                </Col>
              </Row>
              <Card className="">
                <h1 className="titletopbar">Thông tin chi tiết</h1>
                <Row>
                  <Col span={4}>
                    <div>
                      <label className="chu" htmlFor="">
                        Họ tên
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Tên dịch vụ
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Số thứ tự
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Thời gian cấp
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        Hạn sử dụng
                      </label>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <label className="chu" htmlFor=""></label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.namedv}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.STT}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.startdate}</span>
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.enddate}</span>
                      </label>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Nguồn cấp
                      </label>
                      <span>{orders?.provide}</span>
                    </div>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Trạng thái
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Số điện thoại
                      </label>
                    </div>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Địa chỉ email
                      </label>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        <span>{orders?.provide}</span>
                      </label>
                    </div>
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

export default Thongtincapso;
