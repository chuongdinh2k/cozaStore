import React from "react";
import { Col, Form, Input, Row,Container } from "reactstrap";
import "./_Contact.scss";
function Contact() {
  return (
    <div className="Contact">
      <div className="Contact__title">
        <h2>Contact</h2>
      </div>
      <div className="Contact__content">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <div className="Contact__content-left">
              <Row className="justify-content-center">
                <Col xs={10}>
                  <Form className="Contact__form">
                        <h3>Send Us A Message</h3>
                        <Input type="email" className="input-field" placeholder="Your Email address"/>
                        <Input type="textarea" className="input-textarea"  placeholder="How Can We Help?"/>
                        <button className="button" onClick={(e)=>e.preventDefault()}>Submit</button>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} md={6}>
           <div className="Contact__content-right">
                <Row className="justify-content-center">
                <Col xs={10}>
                    <div className="content">
                        <Row>
                            <Col xs={2} className="text-right">
                                <i class="fas fa-map-marker-alt"></i>
                            </Col>
                            <Col xs={6}>
                                <h4>Address</h4>
                                <p>Phan Dinh Giot, Thanh Xuan, Ha Noi</p>
                            </Col>
                        </Row>
                        <Row className="pt-5">
                            <Col xs={2} className="text-right">
                                    <i class="fas fa-phone-alt"></i>             
                            </Col>
                            <Col xs={6}>
                                <h4>Let's talk</h4>
                                <p>+84 961 538 123</p>
                            </Col>
                        </Row>
                        <Row className="pt-5">
                            <Col xs={2} className="text-right">
                                <i class="far fa-envelope"></i>
                            </Col>
                            <Col xs={6}>
                                <h4>Email</h4>
                                <p>admin@gmail.com</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
              </Row>
            </div>
            </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
}

export default Contact;
