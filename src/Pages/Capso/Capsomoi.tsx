import React, { useEffect, useState } from "react";

import { Button, Card, Col, Layout, Modal, Row, Select, message } from "antd";

import { Content } from "antd/es/layout/layout";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";

interface OrderNumbers {
  STT: string;
  namekh: string;
  namedv: string;
  startdate: string;
  enddate: string;
  provide: string;
  id: string;
  isActive: boolean;
}

const Capsomoi: React.FC = () => {
  const [orderNumbers, setOrderNumbers] = useState<OrderNumbers>({
    STT: "",
    namekh: "",
    namedv: "",
    startdate: "",
    enddate: "",
    provide: "",
    id: "",
    isActive: true,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderNumbers | null>(null);
  const [currentNumber, setCurrentNumber] = useState(() => {
    const storedNumber = localStorage.getItem("currentNumber");
    return storedNumber ? parseInt(storedNumber, 10) : 1;
  });
  const [isOrderActive, setIsOrderActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("currentNumber", currentNumber.toString());
  }, [currentNumber]);

  useEffect(() => {
    const expireOrder = () => {
      setIsOrderActive(false);
      setCurrentNumber(1);

      //Cập nhật trạng thái sau 24 tiếng
      if (selectedOrder) {
        const database = getDatabase();
        const orderRef = ref(database, `ordernumbers/${selectedOrder.id}`);
        set(orderRef, { isActive: false }) // Cập nhật trạng thái isActive thành false
          .then(() => {
            console.log("Trạng thái đã được cập nhật sau 24 tiếng");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật trạng thái:", error);
          });
      }
    };

    const timeoutId = setTimeout(expireOrder, 24 * 60 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, [isOrderActive]);

  const generateRandomNumber = (): string => {
    const randomNumber = String(currentNumber).padStart(7, "0");
    setCurrentNumber((prevNumber) => prevNumber + 1);
    return randomNumber;
  };

  const handleSelectChange = (value: string) => {
    setOrderNumbers((prevState) => ({
      ...prevState,
      namedv: value,
    }));
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const handleAddNumber = async () => {
    try {
      const db = getFirestore();
      const orderNumbersCollection = collection(db, "ordernumbers");

      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 5);

      const newOrderData = {
        id: uuidv4(),
        STT: generateRandomNumber(),
        namekh: orderNumbers.namekh,
        namedv: orderNumbers.namedv,
        startdate: formatDate(currentDate),
        enddate: formatDate(endDate),
        provide: orderNumbers.provide,
        isActive: true,
      };

      await addDoc(orderNumbersCollection, newOrderData);

      message.success("Thêm dịch vụ thành công!");
      setIsOrderActive(true);
      showModal(newOrderData);
    } catch (error) {
      console.error("Lỗi khi thêm dịch vụ:", error);
      message.error("Lỗi khi thêm dịch vụ");
    }
  };

  const showModal = (orderData: any) => {
    setSelectedOrder(orderData);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Layout>
        <SiderComponent />
        <Layout>
          <HeaderComponent />
          <Content style={{ marginLeft: "70px" }}>
            <Row>
              <Col span={24}>
                <h1 className="titletopbar">Quản lý cấp số</h1>
              </Col>
            </Row>
            <Row>
              <Card
                style={{
                  display: "flex",
                  justifyContent: "center",

                  height: "450px",
                }}
                className="card-1"
              >
                <h1 style={{ textAlign: "center" }} className="titletopbar">
                  Cấp số mớit
                </h1>
                <h1 style={{ textAlign: "center" }} className="chu">
                  Dịch vụ khách hàng lựa chọn
                </h1>
                <Select
                  style={{ width: "450px" }}
                  className="select-chung"
                  onChange={handleSelectChange}
                >
                  <Select.Option value="Khám tim mạch">
                    Khám tim mạch
                  </Select.Option>
                  <Select.Option value="Khám sản - Phụ khoa">
                    Khám sản - Phụ khoa
                  </Select.Option>
                  <Select.Option value="Khám răng hàm mặt">
                    Khám răng hàm mặt
                  </Select.Option>
                  <Select.Option value="Khám tai mũi họng">
                    Khám tai mũi họng
                  </Select.Option>
                </Select>
                <Content
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <Button className="btn-thietbi2">Hủy bỏ</Button>
                  <Button
                    style={{ marginLeft: "20px" }}
                    className="btn-thietbi"
                    onClick={handleAddNumber}
                  >
                    Cấp số
                  </Button>
                </Content>
              </Card>
            </Row>
            <Modal
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              maskClosable={false}
            >
              <h1>Số thứ tự được cấp</h1>
              {selectedOrder && (
                <>
                  <p>STT: {selectedOrder.STT}</p>
                  <p>Tên dịch vụ: {selectedOrder.namedv}</p>
                  <p>Thời gian cấp: {selectedOrder.startdate}</p>
                  <p>Hạn sử dụng: {selectedOrder.enddate}</p>
                </>
              )}
              {orderNumbers.isActive ? (
                <h2 style={{ textAlign: "center", color: "green" }}>
                  Cấp số đã kích hoạt
                </h2>
              ) : (
                <h2 style={{ textAlign: "center", color: "red" }}>
                  Cấp số đã hết hạn
                </h2>
              )}
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Capsomoi;
