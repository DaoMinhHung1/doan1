import { BellOutlined } from "@ant-design/icons";
import { Col, Dropdown, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../redux/ordernumbersSlice";

const HeaderComponent: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Kiểm tra xem dữ liệu userData có tồn tại trong LocalStorage không
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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

  return (
    <>
      {/* <Header className="account bgheader"> */}
      <Col span={5}>
        <div className="">
          <Dropdown overlay={menu} trigger={["click"]}>
            <BellOutlined
              style={{
                fontSize: "24px",
                color: "red",
                marginLeft: "200px",
              }}
            />
          </Dropdown>
        </div>
      </Col>
      <Col span={2}>
        <img
          style={{ marginTop: "20px" }}
          className="imgaccount"
          src={userData?.avatar}
          alt=""
        />
      </Col>
      <Col className="" span={2}>
        <p className="xc">xin chào</p>
        <p className="name">{userData?.namedn}</p>
      </Col>
      {/* </Header> */}
    </>
  );
};

export default HeaderComponent;
