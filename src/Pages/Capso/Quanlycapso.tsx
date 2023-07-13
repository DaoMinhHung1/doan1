import React, { useEffect, useState } from "react";

import { Button, Col, Form, Input, Layout, Row, Select, Table } from "antd";

import { FileAddOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../../redux/ordernumbersSlice";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface OrderNumbers {
  STT: string;
  namekh: string;
  namedv: string;
  startdate: string;
  enddate: string;
  provide: string;
  id: string;
  isActive: boolean;
}
const Quanlycapso: React.FC = () => {
  //Load dữ liệu user
  const [loginData, setLoginData] = useState<{
    name: string;
  } | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setLoginData(userData);
    }
    console.log(storedUserData);
  }, []);

  const { RangePicker } = DatePicker;

  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const history = useHistory();
  const orderNumbers = useSelector(
    (state: RootState) => state.ordernumbers.orderNumbers
  );

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchOrderNumbers());
      } catch (error) {
        console.error("Error fetching order numbers:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleViewDetails = (orderID: string) => {
    const selectedOrder = orderNumbers.find((order) => order.id === orderID);
    if (selectedOrder) {
      console.log("Selected order:", selectedOrder);
      history.push(`/chitietcs/${orderID}`, { order: selectedOrder });
    } else {
      console.log("Không có dữ liệu đơn hàng");
    }
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const filteredOrderNumbers = orderNumbers.filter((order) => {
    if (
      selectedStatus !== "Tất cả" &&
      order.isActive.toString() !== selectedStatus
    ) {
      return false;
    }
    if (
      searchKeyword.trim() !== "" &&
      !order.namedv.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    if (startDate && endDate) {
      const orderStartDate = dayjs(order.startdate, "DD-MM-YYYY");
      const orderEndDate = dayjs(order.enddate, "DD-MM-YYYY");
      const rangeStartDate = startDate.startOf("day");
      const rangeEndDate = endDate.endOf("day");
      if (
        !(
          orderStartDate.isSame(rangeStartDate, "day") ||
          orderStartDate.isAfter(rangeStartDate, "day")
        ) ||
        !(
          orderEndDate.isSame(rangeEndDate, "day") ||
          orderEndDate.isBefore(rangeEndDate, "day")
        )
      ) {
        return false;
      }
    }
    return true;
  });

  // Table
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
      render: (_text: any, record: OrderNumbers) => (
        <span>{record.namekh || loginData?.name}</span>
      ),
      width: 200,
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "namedv",
      key: "namedv",
      width: 200,
    },
    {
      title: "Thời gian cấp",
      dataIndex: "startdate",
      key: "startdate",
      width: 120,
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "enddate",
      key: "enddate",
      width: 120,
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
      width: 150,
    },
    {
      title: "Nguồn cấp",
      dataIndex: "provide",
      key: "provide",
      render: (_text: any, record: OrderNumbers) => <span>Hệ thống</span>,
      width: 150,
    },
    {
      title: " ",
      dataIndex: "chitietAction",
      key: "chitietAction",
      render: (_text: any, record: OrderNumbers) => (
        <>
          <Button onClick={() => handleViewDetails(record.id)}>Chi tiết</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col style={{ marginLeft: "-17px" }} span={15}>
              <h1 className="chuotren">
                Cấp số &gt;{" "}
                <span className="titletopbar">Danh sách cấp số</span>
              </h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Quản lý cấp số</h1>
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
                        <Select.Option value=" Hoạt động">
                          Hoạt động
                        </Select.Option>
                        <Select.Option value="Ngưng hoạt động">
                          Ngưng hoạt động
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={5} style={{ marginLeft: "-20px", flex: 1 }}>
                  <Form.Item name="range-picker" label="Chọn thời gian">
                    <RangePicker
                      format="DD-MM-YYYY"
                      onChange={(dates) => {
                        if (dates && dates.length === 2) {
                          setStartDate(dates[0]);
                          setEndDate(dates[1]);
                        } else {
                          setStartDate(null);
                          setEndDate(null);
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={10} style={{ marginLeft: "230px", flex: 1 }}>
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
              <Row style={{ marginTop: "-15px" }}>
                <Col span={22}>
                  <div>
                    <Table<OrderNumbers>
                      rowClassName={(record, index) =>
                        index % 2 === 0 ? "table-row-even" : "table-row-odd"
                      }
                      columns={columns}
                      className="custom-table"
                      dataSource={filteredOrderNumbers}
                      pagination={{
                        pageSize: 5,
                        pageSizeOptions: ["5", "10", "15"],
                      }}
                    />
                  </div>
                </Col>
                <Col className="hang-table" span={2}>
                  <FileAddOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/capsomoi";
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

export default Quanlycapso;
