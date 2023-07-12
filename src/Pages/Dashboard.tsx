import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Layout,
  Progress,
  Row,
  Form,
  Select,
  Menu,
  Dropdown,
} from "antd";
import "../StylePages/Home.css";
import { BellOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import SiderComponent from "../Component/SiderComponent";
import CalendarComponent from "../Component/CaclendarComponent";
import { Line } from "@ant-design/charts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../redux/ordernumbersSlice";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { fetchServices } from "../redux/servicesSlice";
import { fetchDevices } from "../redux/devicesSlice";
const { Sider } = Layout;
const { Option } = Select;

const Home: React.FC = () => {
  const ordernumbers = useSelector(
    (state: RootState) => state.ordernumbers.orderNumbers
  );
  const servicesData = useSelector(
    (state: RootState) => state.servies.services
  );
  const devicesData = useSelector((state: RootState) => state.devices.devices);

  // Gọi cấp số
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchOrderNumbers()),
          dispatch(fetchServices()),
          dispatch(fetchDevices()),
        ]);
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  //tính Cấp số
  let totalActive = 0;
  let totalInactive = 0;

  ordernumbers.forEach((order) => {
    if (order.isActive) {
      totalActive++;
    } else {
      totalInactive++;
    }
  });
  //tính dịch vụ
  let servicesnumber = 0;
  let servicesnumber2 = 0;

  servicesData.forEach((service) => {
    if (service.hoatdongdv === "Đang thực hiện") {
      servicesnumber++;
    } else {
      servicesnumber2++;
    }
  });
  //tính thiết bị
  let devicesnumber = 0;
  let devicesnumber2 = 0;

  devicesData.forEach((devices) => {
    if (devices.hoatdongtb === "Hoạt động") {
      devicesnumber++;
    } else {
      devicesnumber2++;
    }
  });

  const menu = (
    <Menu
      style={{ maxHeight: "200px", overflowY: "scroll", background: "#FFF2E7" }}
    >
      {ordernumbers.map((order) => (
        <Menu.Item
          key={order.id}
          style={{
            height: "50px",
            width: "250px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <div style={{ background: "white" }}>
            <p>Người dùng: {order.namekh} </p>
            <p>Thời gian nhận số: {order.enddate}</p>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  // Tên đăng nhập
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Kiểm tra xem dữ liệu userData có tồn tại trong LocalStorage không
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const ordernumbersData = useSelector(
    (state: RootState) => state.ordernumbers.orderNumbers
  );
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [chartType, setChartType] = useState<string>("Ngày");

  const handleChartTypeChange = (value: string) => {
    setChartType(value);
    setSelectedDate(""); // Reset selected date when changing chart type
  };

  //Tính thống kê theo ngày
  const dataByDate = _.groupBy(ordernumbersData, (order) => {
    return order.startdate; // Đảm bảo định dạng ngày đúng ở đây
  });

  const dailyData = _.map(dataByDate, (orders, date) => ({
    startdate: date,
    value: orders.length,
  }));

  const data = _.map(dailyData, (data) => ({
    startdate: data.startdate,
    value: data.value,
  }));

  //Tính thống kê theo tuần
  const getWeekData = (dailyData: any[]) => {
    const weekData: any[] = [];

    for (let i = 0; i < dailyData.length; i += 7) {
      const weekStartIndex = i;
      const weekEndIndex = Math.min(i + 6, dailyData.length - 1);
      const weekValue = dailyData
        .slice(weekStartIndex, weekEndIndex + 1)
        .reduce((total, data) => total + data.value, 0);

      const weekNumber = Math.floor(i / 7) + 1; // Tính số thứ tự tuần

      weekData.push({
        startdate: `Tuần ${weekNumber}`,
        value: weekValue,
      });
    }

    return weekData;
  };

  //Tính thống kê theo tháng
  const getMonthData = (weeklyData: any[]) => {
    const monthData: any[] = [];

    for (let i = 0; i < weeklyData.length; i += 4) {
      const monthStartIndex = i;
      const monthEndIndex = Math.min(i + 3, weeklyData.length - 1);
      const monthValue = weeklyData
        .slice(monthStartIndex, monthEndIndex + 1)
        .reduce((total, data) => total + data.value, 0);

      const monthNumber = Math.floor(i / 4) + 1; // Tính số thứ tự tháng

      monthData.push({
        startdate: `Tháng ${monthNumber}`,
        value: monthValue,
      });
    }

    return monthData;
  };

  //Config biểu đồ the Ngày
  const config = {
    data: data,
    height: 300,
    xField: "startdate",
    yField: "value",
    point: {
      size: 3,
      shape: "diamond",
    },
    yAxis: {
      min: 0,
      max: 50,
      tickCount: 4,
    },
  };

  //Config biểu đồ the Tuần (lấy dữ liệu 7 ngày)
  const weeklyData = getWeekData(dailyData);
  const weeklyConfig = {
    data: weeklyData,
    height: 300,
    xField: "startdate",
    yField: "value",
    point: {
      size: 3,
      shape: "diamond",
    },
    yAxis: {
      min: 0,
      max: 50,
      tickCount: 4,
    },
  };

  //Config biểu đồ the Tháng (lấy dữ liệu 4 tuần)
  const monthlyData = getMonthData(weeklyData);
  const monthconfig = {
    data: monthlyData,
    height: 300,
    xField: "startdate",
    yField: "value",
    point: {
      size: 3,
      shape: "diamond",
    },
    yAxis: {
      min: 0,
      max: 50,
      tickCount: 4,
    },
  };

  return (
    <Layout>
      <SiderComponent />
      <Layout>
        <Header className="account bgheader">
          <Col span={15}>
            <h1 className="titletopbar">Dashboard</h1>
          </Col>
        </Header>
        <Layout>
          <Content>
            <h1
              style={{ marginLeft: "70px", marginTop: "-20px" }}
              className="titletopbar"
            >
              Biểu đồ cấp số
            </h1>
            <div className="card-dashboard-container">
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px" }}
                      icon={faCalendar}
                    />
                    <p style={{ marginLeft: "40px", marginTop: "-40px" }}>
                      Số thứ tự đã cấp
                    </p>
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <p>{ordernumbersData.length}</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px" }}
                      icon={faCalendar}
                    />
                    <p style={{ marginLeft: "40px", marginTop: "-40px" }}>
                      Số thứ tự đã sử dụng
                    </p>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <p>{totalActive}</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px" }}
                      icon={faCalendar}
                    />
                    <p style={{ marginLeft: "40px", marginTop: "-40px" }}>
                      Số thứ tự đang chờ
                    </p>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <p>{totalInactive}</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "10px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px" }}
                      icon={faCalendar}
                    />
                    <p style={{ marginLeft: "40px", marginTop: "-40px" }}>
                      Số thứ tự bỏ qua
                    </p>
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <p>0</p>
                  </div>
                </Card>
              </div>
            </div>
          </Content>
          <Content
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "-40px",
            }}
          >
            <Card style={{ width: "92%", height: "450px" }}>
              <Row>
                <Col style={{ marginTop: "-30px" }} span={20}>
                  <h1>Bảng thống kê theo tháng</h1>
                  <p>11/2023</p>
                </Col>
                <Col span={4}>
                  <div className="">
                    <span>Chọn theo</span>
                    <Form.Item name="chartType">
                      <Select
                        style={{ width: "100px" }}
                        defaultValue="Ngày"
                        onChange={handleChartTypeChange}
                      >
                        <Option value="Ngày">Ngày</Option>
                        <Option value="Tuần">Tuần</Option>
                        <Option value="Tháng">Tháng</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              {chartType === "Ngày" && <Line {...config} />}
              {chartType === "Tuần" && <Line {...weeklyConfig} />}
              {chartType === "Tháng" && <Line {...monthconfig} />}
            </Card>
          </Content>
        </Layout>
      </Layout>
      <Sider
        className="barbenphai"
        width={401}
        style={{ backgroundColor: "#fff" }}
      >
        <Row style={{ marginTop: "20px", marginLeft: "-150px" }}>
          <Col span={10}>
            <Dropdown overlay={menu} trigger={["click"]}>
              <BellOutlined
                style={{
                  fontSize: "24px",
                  color: "red",
                  marginLeft: "200px",
                }}
              />
            </Dropdown>
          </Col>
          <Col span={8}>
            <img
              style={{ marginTop: "-10px", marginLeft: "70px" }}
              className="imgaccount"
              src={userData?.avatar}
              alt=""
            />
          </Col>
          <Col style={{ marginLeft: "-15px" }} className="" span={6}>
            <p className="xc">xin chào</p>
            <p style={{ marginTop: "-15px" }} className="name">
              {userData?.namedn}
            </p>
          </Col>
        </Row>
        <Row>
          <div
            style={{
              margin: "30px",
              display: "flex",
            }}
            className="titletopbar"
          >
            Tổng quan
          </div>
          <div style={{ marginTop: "-30px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress type="circle" size={60} percent={90} />
                <div className="card-info">
                  <div>
                    <p>{devicesData.length}</p>
                    <p>Thiết bị</p>
                  </div>
                  <div>
                    <p>
                      Đang hoạt động <span>{devicesnumber}</span>
                    </p>
                    <p>
                      Ngưng hoạt động <span>{devicesnumber2}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "60px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress type="circle" size={60} percent={90} />
                <div className="card-info">
                  <div>
                    <p>{servicesData.length}</p>
                    <p>Dịch vụ</p>
                  </div>
                  <div>
                    <p>
                      Đang hoạt động <span>{servicesnumber}</span>
                    </p>
                    <p>
                      Ngưng hoạt động <span>{servicesnumber2}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "65px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress
                  style={{ marginTop: "-50px" }}
                  type="circle"
                  size={60}
                  percent={90}
                />
                <div className="card-info">
                  <div>
                    <p>{ordernumbers.length}</p>
                    <p>Cấp số</p>
                  </div>
                  <div style={{ marginLeft: "40px" }}>
                    <p>
                      Đã sử dụng <span>{totalActive}</span>
                    </p>
                    <p>
                      Đang chờ <span>{totalInactive}</span>
                    </p>
                    <p>Bỏ qua</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ marginTop: "80px", marginLeft: "30px" }}>
            <CalendarComponent />
          </div>
        </Row>
      </Sider>
    </Layout>
  );
};

export default Home;
