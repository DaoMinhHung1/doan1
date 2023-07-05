import React, { useEffect } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Layout,
  Menu,
  Row,
  Table,
  Tooltip,
} from "antd";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  BellOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchDevices } from "../../redux/devicesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface DeviceData {
  matb: string;
  nametb: string;
  addresstb: string;
  hoatdongtb: string;
  ketnoitb: string;
  dichvutb: string;
  id: string;
}

const Quanlythietbi: React.FC = () => {
  const history = useHistory();
  const devicesData = useSelector((state: RootState) => state.devices.devices);

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchDevices());
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleViewDetails = (deviceID: string) => {
    const selectedDevice = devicesData.find((device) => device.id === deviceID);
    if (selectedDevice) {
      console.log("Selected device:", selectedDevice);
      history.push(`/chitiettb/${deviceID}`, { device: selectedDevice });
    } else {
      console.log("Không có dữ liệu thiết bị");
    }
  };

  const handleUpdate = (deviceID: string) => {
    const selectedDevice = devicesData.find((device) => device.id === deviceID);
    if (selectedDevice) {
      console.log("Selected device:", selectedDevice);
      history.push(`/capnhattb/${deviceID}`, { device: selectedDevice });
    } else {
      console.log("Không có dữ liệu thiết bị");
    }
  };

  const MAX_DISPLAY_ITEMS = 1;

  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "matb",
      key: "matb",
      width: 150,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "nametb",
      key: "nametb",
      width: 120,
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "addresstb",
      key: "addresstb",
      width: 100,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "hoatdongtb",
      key: "hoatdongtb",
      width: 200,
      render: (text: any, record: DeviceData) => (
        <>
          {" "}
          <CheckCircleOutlined /> Hoạt động
        </>
      ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "ketnoitb",
      key: "ketnoitb",
      width: 200,
      render: (text: any, record: DeviceData) => (
        <>
          <CheckCircleOutlined /> Kết nối
        </>
      ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "dichvutb",
      key: "dichvutb",
      width: 150,
      render: (text: any) => (
        <Tooltip
          title={
            Array.isArray(text) && text.length > MAX_DISPLAY_ITEMS
              ? text.join(", ")
              : ""
          }
        >
          {Array.isArray(text) && text.length > MAX_DISPLAY_ITEMS ? (
            <span>
              {text.slice(0, MAX_DISPLAY_ITEMS).join(", ")} <a>...</a>
            </span>
          ) : (
            text
          )}
        </Tooltip>
      ),
    },
    {
      title: "",
      dataIndex: "viewAction",
      key: "viewAction",
      width: 150,
      render: (_text: any, record: DeviceData) => (
        <>
          <Button onClick={() => handleViewDetails(record.id)}>
            Xem chi tiết
          </Button>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "updateAction",
      key: "updateAction",
      width: 150,
      render: (_text: any, record: DeviceData) => (
        <>
          <Button onClick={() => handleUpdate(record.id)}>Cập nhật</Button>
        </>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="1">Quản lý vai trò</Menu.Item>
      <Menu.Item key="2" onClick={() => (window.location.href = "/user")}>
        Quản lý tài khoản
      </Menu.Item>
      <Menu.Item key="3">Nhật kí người dùng</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout>
        <Sider
          className="menubar"
          width={200}
          style={{ backgroundColor: "Menu" }}
        >
          <Menu theme="light" className="itembar">
            <img className="alta" src="/asset/img/logoalta.png" alt="" />
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/thietbi";
              }}
            >
              Thiết bị
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/dichvu";
              }}
            >
              Dịch vụ
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/capso";
              }}
            >
              Cấp số
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              onClick={() => {
                window.location.href = "/baocao";
              }}
            >
              Báo cáo
            </Menu.Item>

            <Dropdown overlay={menu}>
              <Menu.Item
                className="menu-item"

                // onClick={(e) => e.preventDefault()}
              >
                Cài đặt hệ thống
              </Menu.Item>
            </Dropdown>

            <Menu.Item className="menu-item">Đăng xuất</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="account bgheader">
            <Col span={15}>
              <h1 style={{ marginLeft: "-20px" }} className="titletopbar">
                Thiết bị Danh sách thiết bị
              </h1>
            </Col>
            <Col span={5}>
              <div className="">
                <BellOutlined
                  style={{
                    fontSize: "24px",
                    color: "red",
                    marginLeft: "200px",
                  }}
                />
              </div>
            </Col>
            <Col span={2}>
              <img className="imgaccount" src="/asset/img/ao2.jpg" alt="" />
            </Col>
            <Col className="" span={2}>
              <p className="xc">xin chào</p>
              <p className="name">Đào Minh Hùng</p>
            </Col>
          </Header>
          <Layout style={{ marginTop: "-5px" }} className="center-content">
            <Content>
              <Row>
                <Col span={24}>
                  <h1 className="titletopbar">Danh sách thiết bị</h1>
                </Col>
              </Row>
              <Row>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <label>Tên đăng nhập</label>
                    <Form.Item name="email">
                      <Input className="form-input" />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={10} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Tên đăng nhập</label>
                    <Form.Item name="email">
                      <div className="">
                        <Input className="form-input" />
                      </div>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Tên đăng nhập</label>
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
                    <Table<DeviceData>
                      columns={columns}
                      dataSource={devicesData}
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
                      window.location.href = "/themtb";
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

export default Quanlythietbi;
