import { Card, Col, Input, Layout, Row, Select, Table } from "antd";

import { Content } from "antd/es/layout/layout";

import { useEffect } from "react";
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
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

const { Footer } = Layout;
const { RangePicker } = DatePicker;

const Chitietdichvu: React.FC = () => {
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

  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <HeaderComponent />
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
