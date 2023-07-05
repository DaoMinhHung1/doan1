import { Dropdown, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useHistory } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/rootReducer";
import { AnyAction } from "redux";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "../redux/userSlice";

const SiderComponent: React.FC = () => {
  const history = useHistory();
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAsync())
      .unwrap()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log("Error logging out:", error);
        // Handle the error if necessary
      });
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">Quản lý vai trò</Menu.Item>
      <Menu.Item key="2" onClick={() => (window.location.href = "/taikhoan")}>
        Quản lý tài khoản
      </Menu.Item>
      <Menu.Item key="3">Nhật kí người dùng</Menu.Item>
    </Menu>
  );
  return (
    <>
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
          <Menu.Item
            style={{ marginTop: "230px" }}
            className="menu-item"
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SiderComponent;
