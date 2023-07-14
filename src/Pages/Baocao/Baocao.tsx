import React, { useEffect, useState } from "react";
import { Col, Form, Layout, Row, Table, DatePicker } from "antd";
import { FileMarkdownOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../../redux/ordernumbersSlice";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import * as XLSX from "xlsx";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface OrderNumbers {
  STT: string;
  namedv: string;
  startdate: string;
  isActive: boolean;
  provide: string;
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
        console.error("Error fetching order numbers:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const [filteredData, setFilteredData] = useState<OrderNumbers[]>([]);
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(
    null
  );
  const [originalData, setOriginalData] = useState<OrderNumbers[]>([]);
  const [initialRange, setInitialRange] = useState<[string, string] | null>(
    null
  );

  useEffect(() => {
    if (ordernumbers.length > 0) {
      setOriginalData(ordernumbers);
      setFilteredData(ordernumbers);
    }
  }, [ordernumbers]);

  useEffect(() => {
    if (selectedRange === null) {
      setFilteredData(originalData);
    } else if (Array.isArray(selectedRange)) {
      const [start, end] = selectedRange;
      const filtered = originalData.filter((order) => {
        const orderStartDate = dayjs(order.startdate, "DD-MM-YYYY");
        const rangeStartDate = dayjs(start, "DD-MM-YYYY");
        const rangeEndDate = dayjs(end, "DD-MM-YYYY");

        return (
          orderStartDate.isSame(rangeStartDate, "day") ||
          (orderStartDate.isAfter(rangeStartDate, "day") &&
            orderStartDate.isBefore(rangeEndDate, "day"))
        );
      });

      setFilteredData(filtered);
    }
  }, [selectedRange, originalData]);

  const handleRangePickerChange = (
    dates: any,
    dateStrings: [string, string]
  ) => {
    if (dates === null) {
      setSelectedRange(initialRange);
    } else {
      setSelectedRange(dateStrings);
    }
  };

  const handleClearRangePicker = () => {
    setSelectedRange(null);
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách báo cáo");
    XLSX.writeFile(workbook, "danh-sach-bao-cao.xlsx");
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 150,
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
      width: 200,
      render: (_text: any, record: OrderNumbers) => <span>Hệ thống</span>,
    },
  ];

  const [sortedOrderNumbers, setSortedOrderNumbers] = useState<OrderNumbers[]>(
    []
  );
  useEffect(() => {
    if (originalData.length > 0) {
      setSortedOrderNumbers(
        [...originalData].sort((a, b) => b.STT.localeCompare(a.STT))
      );
    }
  }, [originalData]);

  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <Header className="account bgheader">
          <Col style={{ marginLeft: "-17px" }} span={15}>
            <h1 className="chuotren">
              Báo cáo &gt; <span className="titletopbar">Lập báo cáo</span>
            </h1>
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
                    <RangePicker
                      format="DD-MM-YYYY"
                      value={
                        selectedRange !== null
                          ? [dayjs(selectedRange[0]), dayjs(selectedRange[1])]
                          : null
                      }
                      onChange={handleRangePickerChange}
                      onCalendarChange={(dates) => {
                        if (dates === null) {
                          setInitialRange(selectedRange);
                        }
                      }}
                      allowClear
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <div>
                  <Table<OrderNumbers>
                    rowClassName={(record, index) =>
                      index % 2 === 0 ? "table-row-even" : "table-row-odd"
                    }
                    columns={columns}
                    className="custom-table"
                    style={{ height: "50px" }}
                    dataSource={sortedOrderNumbers}
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
  );
};

export default Quanlybaocao;
