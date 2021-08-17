import React from "react";
import { useSelector } from "react-redux";
import "./_DashBoardTopHeader.scss";
import { Col, Row } from "reactstrap";
function DashBoardTopHeader({ icon, name }) {
  const userInfo = useSelector((state) => state.user.data);
  return (
    <div className="DashBoardTopHeader">
      <Row className="justify-content-between">
        <Col xs="6">
          <div className="DashBoardTopHeader__left">
            <span>
              <i className={`icon ${icon}`}></i>
              {name}
            </span>
          </div>
        </Col>
        <Col xs="6">
          <div className="DashBoardTopHeader__right">
            <span>{userInfo.name}</span>
            <i class="fas fa-crown icon"></i>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoardTopHeader;
