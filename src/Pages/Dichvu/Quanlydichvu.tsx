import React, { useEffect } from "react";

import { Button, Col, Form, Input, Layout, Row, Table } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";

import { useHistory } from "react-router-dom";
import { RootState } from "../../redux/rootReducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchServices } from "../../redux/servicesSlice";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

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
      title: "",
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
      title: "",
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
                  <h1 className="titletopbar">Danh sách dịch vụ</h1>
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
                    <Table<ServiceData>
                      columns={columns}
                      dataSource={sortedServices}
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
