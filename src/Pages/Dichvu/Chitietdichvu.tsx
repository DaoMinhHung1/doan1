import { Card, Col, Input, Layout, Row, Select, Table } from "antd";

import { Content, Header } from "antd/es/layout/layout";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { Option } from "antd/es/mentions";
import { DatePicker } from "antd";
import { Form } from "antd";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { fetchServices } from "../../redux/servicesSlice";
import { CaretLeftFilled, EditFilled, HomeOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { RangePicker } = DatePicker;

const Chitietdichvu: React.FC = () => {
  const location = useLocation();
  const service = location.state?.service;

  const servicesData = useSelector(
    (state: RootState) => state.servies.services
  );

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

  console.log(service);
  //colums table
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "maso",
      key: "maso",
      width: 350,
    },
    {
      title: "Trạng thái",
      dataIndex: "hoatdongdv",
      key: "hoatdongdv",
      width: 400,
    },
  ];

  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <Header className="account bgheader">
          <Col span={15}>
            <h1 className="titletopbar">Dịch vụ</h1>
          </Col>
          <HeaderComponent />
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
                <Col span={6}>
                  <Card style={{ height: "525px" }} className="">
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
                        <p>{service?.namedv}</p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={16}>
                  <Card style={{ height: "525px" }} className="">
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
                            width: "240px",
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
                        rowClassName={(record, index) =>
                          index % 2 === 0 ? "table-row-even" : "table-row-odd"
                        }
                        columns={columns}
                        className="custom-table"
                        dataSource={servicesData}
                        pagination={{
                          pageSize: 4,
                          pageSizeOptions: ["4", "8", "12"],
                        }}
                      />
                    </Row>
                  </Card>
                </Col>
                <Col span={2}>
                  <div
                    style={{ background: "#FFF2E7" }}
                    // onClick={() => (window.location.href = "/dichvu")}
                  >
                    <EditFilled
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                    <p style={{ display: "flex", justifyContent: "center" }}>
                      Cập nhật danh sách
                    </p>
                  </div>
                  <div
                    style={{ background: "#FFF2E7" }}
                    onClick={() => (window.location.href = "/dichvu")}
                  >
                    <CaretLeftFilled
                      style={{ display: "flex", justifyContent: "center" }}
                    />
                    <p style={{ display: "flex", justifyContent: "center" }}>
                      Quay lại
                    </p>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Chitietdichvu;
