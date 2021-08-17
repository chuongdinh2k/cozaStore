import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./_About.scss";
function About() {
  return (
    <div className="About">
      <div className="About__title">
        <h2>About</h2>
      </div>
      <Container>
        <div className="About__content">
          <div className="About__wrapContent">
            <Row className="justify-content-center">
              <Col md={7} xs={11}>
                <div className="ourStory">
                  <h3>Our Story</h3>
                  <p className="pt-5">
                    Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum
                    rhoncus dignissim risus, sed consectetur erat. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Nullam maximus mauris sit amet odio
                    convallis, in pharetra magna gravida. Praesent sed nunc
                    fermentum mi molestie tempor. Morbi vitae viverra odio.
                    Pellentesque ac velit egestas, luctus arcu non, laoreet
                    mauris. Sed in ipsum tempor, consequat odio in, porttitor
                    ante. Ut mauris ligula, volutpat in sodales in, porta non
                    odio. Pellentesque tempor urna vitae mi vestibulum, nec
                    venenatis nulla lobortis. Proin at gravida ante. Mauris
                    auctor purus at lacus maximus euismod. Pellentesque
                    vulputate massa ut nisl hendrerit, eget elementum libero
                    iaculis.
                  </p>
                  <p className="pt-5">
                    Any questions? Let us know in store 64 Phan Dinh Giot,
                    Phuong Liet, Ha Noi, or call us on (+84) 615 384 **
                  </p>
                </div>
              </Col>
              <Col md={5} xs={11}>
                <div className="wrapBorder">
                  <div className="wrapImage">
                    <img src="https://preview.colorlib.com/theme/cozastore/images/xabout-01.jpg.pagespeed.ic.uzAXsYw1Qn.webp" />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="About__wrapContent">
            <Row className="justify-content-center wrapContent__OurMission">
              <Col md={5} xs={11}>
                <div className="wrapBorder">
                  <div className="wrapImage">
                    <img src="https://preview.colorlib.com/theme/cozastore/images/xabout-01.jpg.pagespeed.ic.uzAXsYw1Qn.webp" />
                  </div>
                </div>
              </Col>
              <Col md={7} xs={11}>
                <div className="ourMission">
                  <h3>Our Mission</h3>
                  <p className="pt-5">
                    Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum
                    rhoncus dignissim risus, sed consectetur erat. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Nullam maximus mauris sit amet odio
                    convallis, in pharetra magna gravida. Praesent sed nunc
                    fermentum mi molestie tempor. Morbi vitae viverra odio.
                    Pellentesque ac velit egestas, luctus arcu non, laoreet
                    mauris. Sed in ipsum tempor, consequat odio in, porttitor
                    ante. Ut mauris ligula, volutpat in sodales in, porta non
                    odio. Pellentesque tempor urna vitae mi vestibulum, nec
                    venenatis nulla lobortis. Proin at gravida ante. Mauris
                    auctor purus at lacus maximus euismod. Pellentesque
                    vulputate massa ut nisl hendrerit, eget elementum libero
                    iaculis.
                  </p>
                  <div className="content__quote pt-5">
                    <p>
                      Creativity is just connecting things. When you ask
                      creative people how they did something, they feel a little
                      guilty because they didn't really do it, they just saw
                      something. It seemed obvious to them after a while.
                    </p>
                    <span className="content__people pt-5">- Steve Job’s</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default About;
