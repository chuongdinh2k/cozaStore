import React from "react";
import { Col, Row } from "reactstrap";
import "./_OptionRoutes.scss";
import { useHistory } from "react-router-dom";
function OptionRoutes() {
  const history = useHistory();
  return (
    <div className="OptionRoutes">
      <Row>
        <Col md={4} xs={12}>
          <div
            className="OptionRoutes__item"
            onClick={() => history.push("/shop/all")}
          >
            <img
              className="OptionRoutes__image"
              src="https://preview.colorlib.com/theme/cozastore/images/xbanner-01.jpg.pagespeed.ic.Uj5FE94mgU.webp"
              alt="optionRoute women"
            />
            <div className="OptionRoutes__content">
              <h3>Women</h3>
              <p>Spring 2018</p>
              <div className="button">
                <span>SHOP NOW</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} xs={12}>
          <div
            className="OptionRoutes__item"
            onClick={() => history.push("/shop/all")}
          >
            <img
              className="OptionRoutes__image"
              src="https://preview.colorlib.com/theme/cozastore/images/xbanner-02.jpg.pagespeed.ic.MQuZq6F18q.webp"
              alt="optionRoute women"
            />
            <div className="OptionRoutes__content">
              <h3>Men</h3>
              <p>Spring 2018</p>
              <div className="button">
                <span>SHOP NOW</span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={4} xs={12}>
          <div
            className="OptionRoutes__item"
            onClick={() => history.push("/shop/all")}
          >
            <img
              className="OptionRoutes__image"
              src="https://preview.colorlib.com/theme/cozastore/images/xbanner-03.jpg.pagespeed.ic.1rqLomOaMb.webp"
              alt="optionRoute women"
            />
            <div className="OptionRoutes__content">
              <h3>Accessories</h3>
              <p>Spring 2018</p>
              <div className="button">
                <span>SHOP NOW</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OptionRoutes;
