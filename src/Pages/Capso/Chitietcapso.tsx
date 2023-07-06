import React, { useEffect, useState } from "react";

import { Card, Col, Layout, Row } from "antd";

import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchServices } from "../../redux/servicesSlice";

const Thongtincapso: React.FC = () => {
  const location = useLocation();
  const orders = location.state?.orders;
  const isActive = orders?.isActive || false;

  //Load dữ liệu user
  const [loginData, setLoginData] = useState<{
    name: string;
    email: string;
    password: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setLoginData(userData);
    }
    console.log(storedUserData);
  }, []);

  //Load dữ liệu dịch vụ
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchServices());
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  console.log(orders);
  console.log(loginData);
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
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        Tên dịch vụ
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        Số thứ tự
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        Thời gian cấp
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        Hạn sử dụng
                      </label>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div>
                      <label className="chu marginchu" htmlFor="">
                        <span>{loginData?.name}</span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.namedv}</span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.STT}</span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.startdate}</span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu" htmlFor="">
                        <span>{orders?.enddate}</span>
                      </label>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        Nguồn cấp
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu " htmlFor="">
                        Trạng thái
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu " htmlFor="">
                        Số điện thoại
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu " htmlFor="">
                        Địa chỉ email
                      </label>
                    </div>
                  </Col>
                  <Col span={4}>
                    <div>
                      <label className="chu marginchu " htmlFor="">
                        <span>Hệ thống</span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu " htmlFor="">
                        <span style={{ color: isActive ? "green" : "red" }}>
                          {isActive ? "Hoạt động" : "Bỏ qua"}
                        </span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu " htmlFor="">
                        <span>{loginData?.phone}</span>
                      </label>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <label className="chu marginchu " htmlFor="">
                        <span>{loginData?.email}</span>
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
