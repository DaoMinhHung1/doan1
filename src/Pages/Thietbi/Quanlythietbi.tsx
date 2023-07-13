import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import { HomeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchDevices } from "../../redux/devicesSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

import "../../StylePages/Home.css";

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
  const [selectedStatus, setSelectedStatus] = useState<string>("Tất cả");
  const [selectedConnection, setSelectedConnection] =
    useState<string>("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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

  // lọc từ khóa
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleConnectionChange = (value: string) => {
    setSelectedConnection(value);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const MAX_DISPLAY_ITEMS = 1;
  const filteredDevices = devicesData.filter((device) => {
    if (selectedStatus !== "Tất cả" && device.hoatdongtb !== selectedStatus) {
      return false;
    }
    if (
      selectedConnection !== "Tất cả" &&
      device.ketnoitb !== selectedConnection
    ) {
      return false;
    }
    if (
      searchKeyword.trim() !== "" &&
      !device.nametb.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

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
      render: (hoatdongtb: string) => (
        <Badge
          status={hoatdongtb === "Hoạt động" ? "success" : "default"}
          text={hoatdongtb}
        />
      ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "ketnoitb",
      key: "ketnoitb",
      width: 200,
      render: (ketnoitb: string) => (
        <Badge
          status={ketnoitb === "Kết nối" ? "success" : "default"}
          text={ketnoitb}
        />
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
              {text.slice(0, MAX_DISPLAY_ITEMS).join(", ")} <a>Xem thêm...</a>
            </span>
          ) : (
            text
          )}
        </Tooltip>
      ),
    },
    {
      title: " ",
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
      title: " ",
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

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <Header className="account bgheader">
            <Col style={{ marginLeft: "-17px" }} span={15}>
              <h1 className="chuotren">
                Thiết bị &gt;{" "}
                <span className="titletopbar">Danh sách thiết bị</span>
              </h1>
            </Col>
            <HeaderComponent />
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
                    <label>Trạng thái hoạt động</label>
                    <Form.Item name="email">
                      <Select
                        style={{ width: "300px" }}
                        onChange={handleStatusChange}
                      >
                        <Select.Option value="Tất cả">Tất cả</Select.Option>
                        <Select.Option value="Hoạt động">
                          Hoạt động
                        </Select.Option>
                        <Select.Option value=" Không hoạt động">
                          Không hoạt động
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={10} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-item">
                    <label>Trạng thái kết nối</label>
                    <Form.Item name="email">
                      <Select
                        style={{ width: "300px" }}
                        onChange={handleConnectionChange}
                      >
                        <Select.Option value="Tất cả">Tất cả</Select.Option>
                        <Select.Option value="Kết nối">Kết nối</Select.Option>
                        <Select.Option value="Ngưng kết nối">
                          Ngưng kết nối
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={7} style={{ marginLeft: "-20px", flex: 1 }}>
                  <div className="form-thietbi form-item">
                    <label>Từ khóa</label>
                    <Form.Item name="">
                      <Input
                        className="form-input"
                        placeholder="Nhập từ khóa"
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
                    <Table<DeviceData>
                      rowClassName={(record, index) =>
                        index % 2 === 0 ? "table-row-even" : "table-row-odd"
                      }
                      columns={columns}
                      className="custom-table"
                      dataSource={filteredDevices}
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
