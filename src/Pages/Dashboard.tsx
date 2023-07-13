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
  Badge,
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
import {
  faBan,
  faCalendar,
  faCalendarCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { fetchServices } from "../redux/servicesSlice";
import { fetchDevices } from "../redux/devicesSlice";
import "../StylePages/Index.css";
import moment from "moment";

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

  //Tính phần trăm thiết bị
  const percentageDevices = (devicesnumber / devicesData.length) * 100;
  const percentageDevices2 = (devicesnumber2 / devicesData.length) * 100;
  //Tính phần trăm dịch vụ
  const percentageService = (servicesnumber / servicesData.length) * 100;
  const percentageService2 = (servicesnumber2 / servicesData.length) * 100;
  //Tính phần trăm cấp số
  const percentageOrdernumber = (totalActive / ordernumbers.length) * 100;
  const percentageOrdernumber2 = (totalInactive / ordernumbers.length) * 100;

  //Thông báo chuông
  const unreadCount = ordernumbers.length;
  const menu = (
    <Menu
      style={{
        maxHeight: "300px",
        width: "400px",
        overflowY: "auto",
        background: "#f8f8f8",
        border: "1px solid #dcdcdc",
        borderRadius: "4px",
      }}
    >
      {ordernumbers.map((order) => (
        <Menu.Item
          key={order.id}
          style={{
            height: "auto",
            marginBottom: "10px",
            padding: "10px",
            background: "#fff",
            borderRadius: "4px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div>
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Người dùng: {order.namekh}
            </p>
            <p style={{ marginBottom: "0" }}>
              Thời gian nhận số: {order.enddate}
            </p>
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
    return moment(order.startdate, "DD/MM/YYYY").format("DD-MM"); // Chuyển đổi định dạng ngày
  });

  const dailyData = _.map(dataByDate, (orders, date) => ({
    startdate: date,
    value: orders.length,
  }));

  const sortedData = _.sortBy(dailyData, (data) =>
    moment(data.startdate, "DD-MM")
  ); // Sắp xếp dữ liệu theo ngày tăng dần

  const data = _.map(sortedData, (data) => ({
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
            <h1 style={{ marginLeft: "70px" }} className="titletopbar">
              Biểu đồ cấp số
            </h1>
            <div className="card-dashboard-container">
              <div className="card-dashboard" style={{ marginTop: "-20px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px", color: "#6493F9" }}
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
              <div className="card-dashboard" style={{ marginTop: "-20px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px", color: "#7cb305" }}
                      icon={faCalendarCheck}
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
              <div className="card-dashboard" style={{ marginTop: "-20px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon
                      style={{ height: "35px", color: "#d48806" }}
                      icon={faUsers}
                    />
                    <p style={{ marginLeft: "50px", marginTop: "-40px" }}>
                      Số thứ tự đang chờ
                    </p>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <p>{totalInactive}</p>
                  </div>
                </Card>
              </div>
              <div className="card-dashboard" style={{ marginTop: "-20px" }}>
                <Card style={{ height: "120px", width: "200px" }}>
                  <div>
                    <FontAwesomeIcon style={{ height: "35px" }} icon={faBan} />
                    <p style={{ marginLeft: "40px", marginTop: "-40px" }}>
                      Số thứ tự bỏ qua
                    </p>
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <p>{totalInactive}</p>
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
            <Card style={{ width: "92%", height: "450px", marginTop: "25px" }}>
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
        <Row style={{ marginTop: "20px", marginLeft: "-140px" }}>
          <Col span={13}>
            <div style={{ marginLeft: "240px" }}>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Badge count={unreadCount}>
                  <BellOutlined
                    className="bell-icon "
                    style={{
                      fontSize: "24px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                </Badge>
              </Dropdown>
            </div>
          </Col>
          <Col span={7}>
            <img
              style={{ marginTop: "-10px" }}
              className="imgaccount"
              src={userData?.avatar}
              alt=""
            />
          </Col>
          <Col style={{ marginLeft: "-60px" }} className="" span={3}>
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
                <div className="nested-progress-container">
                  <Progress
                    style={{ marginTop: "-30px" }}
                    type="circle"
                    size={60}
                    percent={percentageDevices}
                    strokeColor="#faad14"
                    className="outer-progress"
                  />
                  <Progress
                    style={{ marginTop: "-30px" }}
                    type="circle"
                    size={40}
                    percent={percentageDevices2}
                    strokeColor="#bfbfbf"
                    format={() => ""}
                    className="inner-progress"
                  />
                </div>
                <div style={{ marginLeft: "70px" }} className="card-info">
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
                <Progress
                  style={{ marginTop: "10px", marginLeft: "25px" }}
                  type="circle"
                  size={60}
                  percent={percentageService}
                  strokeColor="#1677ff"
                  className="outer-progress"
                />
                <Progress
                  style={{ marginTop: "10px", marginLeft: "25px" }}
                  type="circle"
                  size={40}
                  percent={percentageService2}
                  strokeColor="#bfbfbf"
                  format={() => ""}
                  className="inner-progress"
                />
                <div style={{ marginLeft: "60px" }} className="card-info">
                  <div>
                    <p>{ordernumbers.length}</p>
                    <p>Dịch vụ</p>
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
          <div style={{ marginTop: "65px" }} className="card-dulieusider">
            <Card className="card-sider">
              <div style={{ marginTop: "-32px" }} className="card-content">
                <Progress
                  style={{ marginTop: "10px", marginLeft: "25px" }}
                  type="circle"
                  size={60}
                  percent={percentageOrdernumber}
                  strokeColor="#52c41a"
                  className="outer-progress"
                />
                <Progress
                  style={{ marginTop: "10px", marginLeft: "25px" }}
                  type="circle"
                  size={40}
                  percent={percentageOrdernumber2}
                  strokeColor="#bfbfbf"
                  format={() => ""}
                  className="inner-progress"
                />
                <div style={{ marginLeft: "60px" }} className="card-info">
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
