import { BellOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";

const HeaderComponent: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Kiểm tra xem dữ liệu userData có tồn tại trong LocalStorage không
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      <Header className="account bgheader">
        <Col span={15}>
          <h1 className="titletopbar">Dashboard</h1>
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
          <img
            style={{ marginTop: "20px" }}
            className="imgaccount"
            src="/asset/img/ao2.jpg"
            alt=""
          />
        </Col>
        <Col className="" span={2}>
          <p className="xc">xin chào</p>
          <p className="name">{userData?.namedn}</p>
        </Col>
      </Header>
    </>
  );
};

export default HeaderComponent;
