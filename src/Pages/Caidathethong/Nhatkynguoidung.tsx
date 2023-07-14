import React, { useEffect, useState } from "react";
import { Col, Form, Input, Layout, Row, Table, DatePicker } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface DiaryData {
  email: string;
  hanhDong: string;
  thoiGian: string;
  bang: string;
}

const Quanlynguoidung: React.FC = () => {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedRange, setSelectedRange] = useState<[string, string] | null>(
    null
  );
  const [originalData, setOriginalData] = useState<DiaryData[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const diaryCollection = collection(db, "diary");

    const unsubscribe = onSnapshot(diaryCollection, (snapshot) => {
      const data: DiaryData[] = [];
      snapshot.forEach((doc) => {
        const diaryEntry = doc.data() as DiaryData;
        const date = new Date(diaryEntry.thoiGian);
        diaryEntry.thoiGian = date.toLocaleString(); // Chuyển đổi thành chuỗi ngày và giờ
        data.push(diaryEntry);
      });
      setDiaryData(
        data.sort(
          (a, b) =>
            new Date(b.thoiGian).getTime() - new Date(a.thoiGian).getTime()
        )
      ); // Sắp xếp mảng dựa trên trường thoiGian (mới nhất đến cũ nhất)
    });

    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, []);

  useEffect(() => {
    if (diaryData.length > 0) {
      setOriginalData(diaryData);
    }
  }, [diaryData]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleRangePickerChange = (
    dates: any,
    dateStrings: [string, string]
  ) => {
    setSelectedRange(dates);
  };

  const filterData = (data: DiaryData[]) => {
    return data.filter((item) => {
      // Lọc theo từ khóa
      if (
        searchKeyword.trim() !== "" &&
        !item.email.toLowerCase().includes(searchKeyword.toLowerCase())
      ) {
        return false;
      }

      // Lọc theo RangePicker
      if (selectedRange !== null) {
        const [start, end] = selectedRange;
        const dataDate = dayjs(item.thoiGian);
        const rangeStartDate = dayjs(start, "DD-MM-YYYY");
        const rangeEndDate = dayjs(end, "DD-MM-YYYY");

        if (
          !(
            dataDate.isSame(rangeStartDate, "day") ||
            (dataDate.isAfter(rangeStartDate, "day") &&
              dataDate.isBefore(rangeEndDate, "day"))
          )
        ) {
          return false;
        }
      }
      return true;
    });
  };
  // Table columns
  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Thời gian tác động",
      dataIndex: "thoiGian",
      key: "thoiGian",
      width: 200,
    },
    {
      title: "IP thực hiện",
      dataIndex: "dessdv",
      key: "dessdv",
      render: (text: string) => "127.0.0.1",
      width: 200,
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "hanhDong",
      key: "hanhDong",
      width: 200,
    },
  ];

  const filteredData = filterData(originalData);

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col style={{ marginLeft: "-17px" }} span={15}>
              <h1 className="chuotren">
                Cài đặt hệ thống &gt;{" "}
                <span className="titletopbar">Nhật ký người dùng</span>
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
                <Col span={5} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <Form.Item name="range-picker" label="Chọn thời gian">
                      <RangePicker
                        format="DD-MM-YYYY"
                        onChange={handleRangePickerChange}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={19} style={{ marginLeft: "575px", flex: 1 }}>
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
                    <div style={{ marginBottom: 16 }}></div>
                    <Table<DiaryData>
                      rowClassName={(record, index) =>
                        index % 2 === 0 ? "table-row-even" : "table-row-odd"
                      }
                      columns={columns}
                      className="custom-table"
                      style={{ height: "50px" }}
                      dataSource={filteredData}
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

export default Quanlynguoidung;
