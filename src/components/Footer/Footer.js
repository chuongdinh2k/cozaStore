import React from 'react';
import "./_Footer.scss";
import {Col, Container, Row} from 'reactstrap';
function Footer() {
    return (
        <div className="Footer">
          <Container>
            <Row >
                    <Col xs={12}  sm={6} sm={3}>
                        <div className="Footer__category item">
                            <h3>CATEGORIES</h3>
                            <p>Women</p>
                            <p>Men</p>
                            <p>Shoes</p>
                            <p>Watches</p>
                        </div>
                    </Col>
                    <Col xs={12}  sm={6} sm={3}>
                    <div className="item">
                            <h3>HELP</h3>
                            <p>Track Order</p>
                            <p>Return</p>
                            <p>Shipping</p>
                            <p>FAQs</p>
                        </div>
                    </Col>
                    <Col xs={12}  sm={6} sm={3}>
                        <div className="item">
                                <h3>GET IN TOUCH</h3>
                                <p className="address">My address: Thanh Xuan - Ha Noi - Viet Nam</p>
                                <span>
                                    <i className="fab fa-facebook-f icon"></i>
                                    <i className="fab fa-instagram icon"></i>
                                </span>
                                
                        </div>
                    </Col>
                    <Col xs={12}  sm={6} sm={3}>
                        <div className="item">
                                    <h3>NEWSLETTER</h3>
                                    <form>
                                        <div className="Footer__wrapInput">
                                            <input type="email" className="Footer__input" placeholder="email@example.com"/>
                                            <div className="Footer__inputBorder"></div>
                                        </div>
                                        <button className="Footer__button"
                                            onClick={(e)=>e.preventDefault()}
                                        >SUBSCRIBE</button>
                                    </form>
                                    {/* <button>SUBSCRIBE</button> */}
                            </div>
                    </Col>
                </Row>
          </Container>
        </div>
    )
}

export default Footer
