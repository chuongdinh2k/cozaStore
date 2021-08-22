import React, { useState } from "react";
import { Col, Container, Row, Table, Collapse } from "reactstrap";
import "./_OrderHistory.scss";
function OrderHistory() {
  const shippingAddress = JSON.parse(
    localStorage.getItem("LOCAL_STORAGE_SHIPPING")
  );
  console.log(shippingAddress);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
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
      </Container>
    </div>
  );
}

export default OrderHistory;
