import React, { useEffect } from "react";

import { Col, Form, Layout, Row, Table } from "antd";

import { FileMarkdownOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { DatePicker } from "antd";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/rootReducer";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../../redux/ordernumbersSlice";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

const { RangePicker } = DatePicker;

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
const Quanlybaocao: React.FC = () => {
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

  //Down dữ liệu xuống Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(ordernumbers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách báo cáo");
    XLSX.writeFile(workbook, "danh-sach-bao-cao.xlsx");
  };

  // Table
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      with: 150,
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
      width: 200,
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
    },
    {
      title: "Nguồn cấp",
      dataIndex: "provide",
      key: "provide",
      render: (text: any, record: OrderNumbers) => <span>Hệ thống</span>,
      width: 200,
    },
  ];

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="titletopbar">Báo cáo</h1>
            </Col>
            <HeaderComponent />
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách báo cáo</h1>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <Form.Item name="range-picker" label="Chọn thời gian">
                      <RangePicker />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <div>
                    <div style={{ marginBottom: 16 }}></div>
                    <Table<OrderNumbers>
                      columns={columns}
                      dataSource={ordernumbers}
                      pagination={{
                        pageSize: 5,
                        pageSizeOptions: ["5", "10", "15"],
                      }}
                    />
                  </div>
                </Col>
                <Col className="hang-table" span={2}>
                  <Col className="hang-table" span={2}>
                    <FileMarkdownOutlined onClick={handleDownloadExcel} />
                  </Col>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Quanlybaocao;
