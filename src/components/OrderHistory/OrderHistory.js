import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Table, Collapse } from "reactstrap";
import "./_OrderHistory.scss";
import { getOwnOrdersApi } from "../../api";
import { useSelector } from "react-redux";
import { convertTime } from "../../utils";
function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userInfo = useSelector((state) => state.user.data);
  const shippingAddress = JSON.parse(
    localStorage.getItem("LOCAL_STORAGE_SHIPPING")
  );
  // state toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // fetch data
  useEffect(() => {
    // this api name was defined in the api folder
    axios
      .get(`${getOwnOrdersApi}`, {
        headers: { Authorization: `Bearer ${userInfo?.accessToken}` },
      })
      .then((response) => {
        console.log(response);
        setOrders(response.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setOrders]);
  console.log(orders);
  return (
    <div className="orderHistory">
      <Container>
        <h2>Order History</h2>
        <Row className="justify-content-center">
          {/* <h4>Your shipping address:</h4> */}
          <Col xs={12} md={6}>
            {shippingAddress ? (
              <div className="orderHistory__submit">
                <h4>
                  Hi {shippingAddress.fullName}, please check and submit your
                  order!
                </h4>
                <p onClick={toggle}>
                  Products{" "}
                  {!isOpen ? (
                    <i class="fas fa-sort-down"></i>
                  ) : (
                    <i class="fas fa-sort-up"></i>
                  )}
                </p>
                <Collapse isOpen={isOpen}>
                  <Table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>image</th>
                        <th>name</th>
                      </tr>
                    </thead>
                  </Table>
                </Collapse>
                <div className="address">
                  <p>Shipping address:</p>
                  <p>
                    <i>
                      {shippingAddress.address} - {shippingAddress.ward} -{" "}
                      {shippingAddress.district} - {shippingAddress.province}
                    </i>
                  </p>
                </div>
                <p>Phone: {shippingAddress.phone}</p>
                <div className="payment">
                  <p>
                    Payment:{" "}
                    <span style={{ color: "blue" }}>
                      {shippingAddress.payment}
                    </span>
                  </p>
                </div>
                <p>Tax: $0</p>
                <div className="Total d-flex">
                  <p>ToTal</p>
                  <p>$34.50</p>
                </div>
                <button className="button">Submit Order</button>
              </div>
            ) : (
              <p style={{ fontSize: "3rem" }}>There is no available order!</p>
            )}
          </Col>
        </Row>
        <div className="orderHistory__lastOrder pt-5">
          <h3>Last Order</h3>
          <Row>
            <Col>
              {" "}
              <Table bordered>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Items</th>
                    <th className="col-address">Address</th>
                    <th>FullName</th>
                    <th>Phone</th>
                    <th>Items Total</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th>Is Paid</th>
                    <th>Ordered At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length == 0
                    ? ""
                    : orders.map((item, index) => {
                        return (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <ul>
                                {!item.orderItems
                                  ? ""
                                  : item.orderItems.map((subItem, index) => {
                                      return (
                                        <li key={subItem._id}>
                                          <img
                                            className="table-image"
                                            src={subItem.image}
                                          />
                                        </li>
                                      );
                                    })}
                              </ul>
                            </td>
                            <td>{`${item.shippingAddress.address} - ${item.shippingAddress.ward}
                          - ${item.shippingAddress.district} - ${item.shippingAddress.city}
                          `}</td>
                            <td>{item.shippingAddress.fullName}</td>
                            <td>{item.shippingAddress.phone}</td>
                            <td>${item.itemsPrice}</td>
                            <td>${item.taxPrice}</td>
                            <td>${item.totalPrice}</td>
                            <td>{item.isPaid ? "Yes" : "No"}</td>
                            <td>{convertTime(item.updatedAt)}</td>
                            <td>
                              <span style={{ color: "green" }}>
                                on going...
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default OrderHistory;
