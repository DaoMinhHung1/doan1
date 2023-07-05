import React from "react";

import { Col, Form, Input, Layout, Row, Table } from "antd";

import { HomeOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

const Danhsachcsdangsd: React.FC = () => {
  interface DataType {
    idtb: React.Key;
    nametb: "Mike";
    addresstb: 32;
    hoatdongtb: "t";
    ketnoitb: "t";
    dichvutb: "t";
    chitiet: "chitiet";
    capnhat: "capnhat";
  }
  // Table
  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "matb",
      key: "matb",
      render: () => "TB01",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "nametb",
      key: "nametb",
      width: 150,
    },
    {
      title: "Địa chỉ Ip",
      dataIndex: "addresstb",
      key: "addresstb",
      width: 150,
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "hoatdongtb",
      key: "hoatdongtb",
      width: 150,
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "ketnoitb",
      key: "ketnoitb",
      width: 150,
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "dichvutb",
      key: "dichvutb",
      width: 150,
    },
    {
      title: "",
      dataIndex: "chitiet",
      key: "chitiet",
    },
    {
      title: "",
      dataIndex: "capnhat",
      key: "capnhat",
    },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      idtb: i,
      nametb: "Mike",
      addresstb: 32,
      hoatdongtb: "t",
      ketnoitb: "t",
      dichvutb: "t",
      chitiet: "chitiet",
      capnhat: "capnhat",
    });
  }

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
                  <h1 className="titletopbar">Quản lý cấp số</h1>
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
                    <Table columns={columns} dataSource={data} />
                  </div>
                </Col>
                <Col className="hang-table" span={2}>
                  <HomeOutlined
                    className="icon-thietbi"
                    onClick={() => {
                      window.location.href = "/themdichvu";
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

export default Danhsachcsdangsd;
