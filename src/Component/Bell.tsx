import React, { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/rootReducer";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { fetchOrderNumbers } from "../redux/ordernumbersSlice";
import { Menu, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Bell: React.FC = () => {
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
      <div>
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
    </>
  );
};

export default Bell;
