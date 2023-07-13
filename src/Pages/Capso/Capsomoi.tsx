import React, { useEffect, useState } from "react";

import { Button, Card, Col, Layout, Modal, Row, Select, message } from "antd";

import { Content, Header } from "antd/es/layout/layout";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import SiderComponent from "../../Component/SiderComponent";
import HeaderComponent from "../../Component/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { fetchServices } from "../../redux/servicesSlice";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";

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
  const [allocatedOrderNumbers, setAllocatedOrderNumbers] = useState<{
    [namedv: string]: string[];
  }>({});
  const [currentNumber, setCurrentNumber] = useState(() => {
    const storedNumber = localStorage.getItem("currentNumber");
    return storedNumber ? parseInt(storedNumber, 10) : 1;
  });
  const [isOrderActive, setIsOrderActive] = useState(false);

  const servicesData = useSelector(
    (state: RootState) => state.servies.services
  );

  const storedUserData = localStorage.getItem("userData");
  const [loginData, setLoginData] = useState<{
    name: string;
  } | null>(storedUserData ? JSON.parse(storedUserData) : null);

  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchServices());
      } catch (error) {
        console.error("Error fetching device data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("currentNumber", currentNumber.toString());
  }, [currentNumber]);

  useEffect(() => {
    const checkClosingTime = () => {
      const currentTime = moment();
      const closingTime = moment().set({ hour: 17, minute: 30, second: 0 });

      if (currentTime.isSameOrAfter(closingTime)) {
        setIsOrderActive(false);
      }
    };

    checkClosingTime();

    const intervalId = setInterval(checkClosingTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSelectChange = (value: string) => {
    setOrderNumbers((prevState) => ({
      ...prevState,
      namedv: value,
    }));
  };

  const formatDate = (date: Date): string => {
    const formattedDate = moment(date).format("DD-MM-YYYY");
    return formattedDate;
  };

  const saveAllocatedNumbers = (namedv: string, numbers: string[]) => {
    localStorage.setItem(namedv, JSON.stringify(numbers));
  };

  const getAllocatedNumbers = (namedv: string): string[] => {
    const allocatedNumbers = localStorage.getItem(namedv);
    return allocatedNumbers ? JSON.parse(allocatedNumbers) : [];
  };

  const handleAddNumber = async () => {
    const selectedService = servicesData.find(
      (service) => service.namedv === orderNumbers.namedv
    );

    if (!selectedService) {
      message.error("Không tìm thấy dịch vụ");
      return;
    }

    const { maso } = selectedService;

    const allocatedNumbers = getAllocatedNumbers(orderNumbers.namedv);

    if (allocatedNumbers.includes(maso)) {
      message.error("Mã số đã được cấp trước đó");
      return;
    }

    try {
      const db = getFirestore();
      const orderNumbersCollection = collection(db, "ordernumbers");

      const currentDate = new Date();
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 5);

      const newOrderData = {
        id: uuidv4(),
        STT: maso,
        namekh: loginData?.name || "",
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

      // Thêm maso vào mảng allocatedNumbers trong Local Storage
      allocatedNumbers.push(maso);
      saveAllocatedNumbers(orderNumbers.namedv, allocatedNumbers);

      setAllocatedOrderNumbers((prevState) => ({
        ...prevState,
        [orderNumbers.namedv]: allocatedNumbers,
      }));
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
          <Header className="account bgheader">
            <Col span={15}>
              <h1 className="titletopbar">Cấp số</h1>
            </Col>
            <HeaderComponent />
          </Header>
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
                  placeholder="Chọn dịch vụ"
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
