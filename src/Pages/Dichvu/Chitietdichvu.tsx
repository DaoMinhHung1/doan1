import { BellOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Row,
  Select,
  Table,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../../redux/ordernumbersSlice";
import { Option } from "antd/es/mentions";
import { DatePicker } from "antd";
import { Form } from "antd";

const { Footer } = Layout;
const { RangePicker } = DatePicker;

const Chitietdichvu = () => {
  const location = useLocation();
  const service = location.state?.service;

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

  console.log(service);
  //colums table
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "STT",
      key: "STT",
      width: 350,
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
      width: 400,
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">Quản lý vai trò</Menu.Item>
      <Menu.Item key="2" onClick={() => (window.location.href = "/user")}>
        Quản lý tài khoản
      </Menu.Item>
      <Menu.Item key="3">Nhật kí người dùng</Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        className="menubar"
        width={200}
        style={{ backgroundColor: "Menu" }}
      >
        <Menu theme="light" className="itembar">
          <img className="alta" src="/asset/img/logoalta.png" alt="" />
          <Menu.Item
            className="menu-item"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            onClick={() => {
              window.location.href = "/thietbi";
            }}
          >
            Thiết bị
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            onClick={() => {
              window.location.href = "/dichvu";
            }}
          >
            Dịch vụ
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            onClick={() => {
              window.location.href = "/capso";
            }}
          >
            Cấp số
          </Menu.Item>
          <Menu.Item
            className="menu-item"
            onClick={() => {
              window.location.href = "/baocao";
            }}
          >
            Báo cáo
          </Menu.Item>

          <Dropdown overlay={menu}>
            <Menu.Item
              className="menu-item"

              // onClick={(e) => e.preventDefault()}
            >
              Cài đặt hệ thống
            </Menu.Item>
          </Dropdown>

          <Menu.Item className="menu-item">Đăng xuất</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="account bgheader">
          <Col span={15}>
            <h1 style={{ marginLeft: "-20px" }} className="titletopbar">
              Thiết bị Danh sách thiết bị
            </h1>
          </Col>
          <Col span={5}>
            <div className="">
              <BellOutlined
                style={{
                  fontSize: "24px",
                  color: "red",
                  marginLeft: "200px",
                }}
              />
            </div>
          </Col>
          <Col span={2}>
            <img className="imgaccount" src="/asset/img/ao2.jpg" alt="" />
          </Col>
          <Col className="" span={2}>
            <p className="xc">xin chào</p>
            <p className="name">Đào Minh Hùng</p>
          </Col>
        </Header>
        <Content>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Row>
              <Col span={24}>
                <h1 className="titletopbar">Quản lý dịch vụ</h1>
              </Col>
            </Row>
            <Content>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card className="">
                    <h1 className="titletopbar">Thông tin dịch vụ</h1>
                    <Row>
                      <Col span={8}>
                        <div>
                          <label className="chu" htmlFor="">
                            Mã dịch vụ:
                          </label>
                        </div>
                        <div>
                          <label className="chu marginchu" htmlFor="">
                            Tên dịch vụ:
                          </label>
                        </div>
                        <div>
                          <label className="chu marginchu" htmlFor="">
                            Mô tả:
                          </label>
                        </div>
                      </Col>
                      <Col span={16}>
                        <div>
                          <label className="" htmlFor="">
                            <span>{service?.madv}</span>
                          </label>
                        </div>
                        <div>
                          <label className=" marginchu" htmlFor="">
                            <span>{service?.namedv}</span>
                          </label>
                        </div>
                        <div>
                          <label className=" marginchu" htmlFor="">
                            <span>{service?.dessdv}</span>
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
                </Col>
                <Col span={16}>
                  <Card className="">
                    <Row>
                      <div>
                        <Select
                          style={{ width: "150px" }}
                          placeholder="Chọn trạng thái"
                          className=""
                        >
                          <Option value="Tất cả">Tất cả</Option>
                          <Option value="Đã hoàn thành">Đã hoàn thành</Option>
                          <Option value="Đã thực hiện">Đã thực hiện</Option>
                          <Option value="Đã vắng">Đã vắng</Option>
                        </Select>
                      </div>
                      <div className="form-item">
                        <Form.Item name="range-picker">
                          <RangePicker />
                        </Form.Item>
                      </div>
                      <div style={{ marginLeft: "30px" }} className="">
                        <Input
                          style={{
                            width: "260px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                          className=""
                          placeholder="Chọn từ khóa"
                        />
                      </div>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                      <Table
                        columns={columns}
                        dataSource={ordernumbers}
                        pagination={{
                          pageSize: 4,
                          pageSizeOptions: ["4", "8", "12"],
                        }}
                      />
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Your Footer Content</Footer>
      </Layout>
    </Layout>
  );
};

export default Chitietdichvu;
