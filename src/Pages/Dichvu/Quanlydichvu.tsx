import React, { useEffect, useState } from "react";

import { Button, Col, Form, Input, Layout, Row, Select, Table } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";

import { useHistory } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchServices } from "../../redux/servicesSlice";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { DatePicker } from "antd";

interface ServiceData {
  madv: string;
  namedv: string;
  motadv: number;
  hoatdongdv: string;
  maso: string;
  id: string;
}

const Quanlydichvu: React.FC = () => {
  const history = useHistory();
  const servicesData = useSelector(
    (state: RootState) => state.servies.services
  );

  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
  const sortedServices = [...servicesData];
  sortedServices.sort((a, b) => {
    const maDV1 = parseInt(a.madv.slice(2)); // Lấy phần số từ chuỗi "DV01"
    const maDV2 = parseInt(b.madv.slice(2)); // Lấy phần số từ chuỗi "DV02"
    return maDV1 - maDV2;
  });

  //nút nhấn chi tiết lưu qua URL
  const handleViewDetails = (serviceID: string) => {
    const selectedService = servicesData.find(
      (service) => service.maso === serviceID
    );
    if (selectedService) {
      console.log("Selected service:", selectedService);
      history.push(`/chitietdv/${serviceID}`, { service: selectedService });
    } else {
      console.log("Không có dữ liệu dịch vụ");
    }
  };
  const handleUpdate = (serviceID: string) => {
    const selectedService = servicesData.find(
      (service) => service.maso === serviceID
    );
    if (selectedService) {
      console.log("Selected device:", selectedService);
      // setSelectedService(selectedService);
      history.push(`/capnhatdv/${serviceID}`, { service: selectedService });
    } else {
      console.log("Không có dữ liệu thiết bị");
    }
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const filteredServices = servicesData.filter((service) => {
    if (selectedStatus !== "Tất cả" && service.hoatdongdv !== selectedStatus) {
      return false;
    }
    if (
      searchKeyword.trim() !== "" &&
      !service.namedv.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const { RangePicker } = DatePicker;
  // Table
  const columns = [
    {
      title: "Mã dịch vụ",
      dataIndex: "madv",
      key: "madv",
      width: 150,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "namedv",
      key: "namedv",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "dessdv",
      key: "dessdv",
      width: 200,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "hoatdongdv",
      key: "hoatdongdv",
      width: 200,
    },

    {
      title: " ",
      dataIndex: "viewAction",
      key: "viewAction",
      width: 150,
      render: (_text: any, record: ServiceData) => (
        <>
          <Button onClick={() => handleViewDetails(record.maso)}>
            Chi tiết
          </Button>
        </>
      ),
    },
    {
      title: " ",
      dataIndex: "updateAction",
      key: "updateAction",
      width: 150,
      render: (_text: any, record: ServiceData) => (
        <>
          <Button onClick={() => handleUpdate(record.maso)}>Cập nhật</Button>
        </>
      ),
    },
  ];

  const sortedSevices = [...filteredServices].sort((a, b) => {
    return b.madv.localeCompare(a.madv);
  });

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col style={{ marginLeft: "-17px" }} span={15}>
              <h1 className="chuotren">
                Dịch vụ &gt;{" "}
                <span className="titletopbar">Danh sách dịch vụ</span>
              </h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách dịch vụ</h1>
                </Col>
              </Row>
              <Row>
                <Col
                  span={7}
                  style={{ marginLeft: "-20px", flex: 1, marginTop: "8px" }}
                >
                  <div className="form-item">
                    <label>Trạng thái hoạt động</label>
                    <Form.Item name="email">
                      <Select
                        style={{ width: "300px" }}
                        onChange={handleStatusChange}
                      >
                        <Select.Option value="Tất cả">Tất cả</Select.Option>
                        <Select.Option value="Đang thực hiện">
                          Đang thực hiện
                        </Select.Option>
                        <Select.Option value=" Đã hoàn thành">
                          Đã hoàn thành
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={5} style={{ marginLeft: "-20px", flex: 1 }}>
                  <Form.Item name="range-picker" label="Chọn thời gian">
                    <RangePicker />
                  </Form.Item>
                </Col>
                <Col span={12} style={{ marginLeft: "230px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Từ khóa</label>
                    <Form.Item name="email">
                      <Input
                        className="form-input"
                        onChange={handleKeywordChange}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16, marginTop: "-20px" }}></div>
                    <Table<ServiceData>
                      rowClassName={(record, index) =>
                        index % 2 === 0 ? "table-row-even" : "table-row-odd"
                      }
                      columns={columns}
                      className="custom-table"
                      style={{ height: "50px" }}
                      dataSource={sortedSevices}
                      pagination={{
                        pageSize: 5,
                        pageSizeOptions: ["5", "10", "15"],
                      }}
                    />
                  </div>
                </Col>
                <Col
                  style={{ marginTop: "20px" }}
                  className="hang-table icon-thietbi"
                  span={2}
                >
                  <HomeOutlined
                    onClick={() => {
                      window.location.href = "/themdv";
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

export default Quanlydichvu;
