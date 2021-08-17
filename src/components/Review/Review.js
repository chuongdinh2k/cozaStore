import React, { useState, useEffect } from "react";
import "./_Review.scss";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Form,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import { renderStar } from "../../utils";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productReview, showAuth } from "../../redux/actions";
function Review({ productState, review }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("reviewState", review);
  const message = useSelector((state) => state.product.message);
  console.log("message", message);
  const userinfo = useSelector((state) => state.user.data);

  console.log(productState);
  // state for api
  const user = userinfo ? userinfo.accessToken : "";
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  //submit a review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userinfo) {
      dispatch(showAuth());
      return;
    }
    dispatch(
      productReview.productReviewRequest({
        user,
        id,
        rating,
        comment,
      })
    );
    setRating(1);
    setComment("");
    // return ()=>dispatch(productReview.productReviewRet());
  };
  // if (message) {
  //   setTimeout(function () {
  //     alert(message);
  //   }, 1000);
  // }
  // if (message) {
  //   setTimeout(function () {
  //     alert(message);
  //   }, 1000);
  // }
  useEffect(() => {
    // aler
    return () => dispatch(productReview.productReviewReset());
  }, [dispatch]);
  //state for reactstrap components
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  console.log("arr", { id, user, rating, comment });
  return productState ? (
    <div className="Review">
      <Nav tabs className="d-flex justify-content-center">
        <NavItem>
          <NavLink
            className={activeTab === "1" ? "activeNav" : ""}
            onClick={() => {
              toggle("1");
            }}
          >
            Description
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "2" ? "activeNav" : ""}
            onClick={() => {
              toggle("2");
            }}
          >
            {!review
              ? `Review (${productState.numReviews})`
              : `Review (${review.numReviews})`}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="pt-5">
        <TabPane tabId="1">
          <Row className="justify-content-center">
            <Col xs="10">
              <p>
                Aenean sit amet gravida nisi. Nam fermentum est felis, quis
                feugiat nunc fringilla sit amet. Ut in blandit ipsum. Quisque
                luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi
                elementum sapien rhoncus pretium maximus. Nulla lectus enim,
                cursus et elementum sed, sodales vitae eros. Ut ex quam, porta
                consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac
                libero varius molestie. Aenean tempor sit amet orci nec iaculis.
                Cras sit amet nulla libero. Curabitur dignissim, nunc nec
                laoreet consequat, purus nunc porta lacus, vel efficitur tellus
                augue in ipsum. Cras in arcu sed metus rutrum iaculis. Nulla non
                tempor erat. Duis in egestas nunc.
              </p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="justify-content-center">
            {/* render review in database */}
            {productState.numReviews !== 0
              ? productState.reviews.map((e) => {
                  return (
                    <Col xs={8} md={8} xl={7} key={e._id}>
                      <div className="Review__user d-flex">
                        <div className="Review__user-avatar">
                          <i class="far fa-user userIcon"></i>
                        </div>
                        <div className="Review__user-content ">
                          <div className="Review__user-name ">
                            <Row className="d-flex justify-content-between">
                              <Col xs={12} md={6}>
                                <span>{e.name}</span>
                              </Col>
                              <Col xs={12} md={6}>
                                {renderStar(e.rating)}
                              </Col>
                            </Row>
                          </div>
                          <p className="Review__user-comment pt-3">
                            {e.comment}
                          </p>
                          <p className="text-right">
                            <i>{moment(e.createdAt).format("DD-MM-YYYY")}</i>
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })
              : ""}
            {/* render review when submit successfully*/}
            {review ? (
              <Col xs={10} md={8} xl={7}>
                <div className="Review__user d-flex">
                  <div className="Review__user-avatar">
                    <i class="far fa-user userIcon"></i>
                  </div>
                  <div className="Review__user-content ">
                    <div className="Review__user-name">
                      <Row className="d-flex justify-content-between">
                        <Col xs={12} md={6}>
                          <span>{review.review.name}</span>
                        </Col>
                        <Col xs={12} md={6}>
                          {renderStar(review.review.rating)}
                        </Col>
                      </Row>
                    </div>
                    <p className="Review__user-comment pt-3">
                      {review.review.comment}
                    </p>
                    <p className="text-right">
                      <i>
                        {moment(review.review.createdAt).format("DD-MM-YYYY")}
                      </i>
                    </p>
                  </div>
                </div>
              </Col>
            ) : (
              ""
            )}
            <Col xs={10} md={7} xl={7}>
              <Form className="Review__form pt-5">
                <h3>Add a review</h3>
                <p>Leave your feedback here *</p>
                <div className="pt-4">
                  <Label>Your Rating</Label>
                  <span className="pl-3">
                    <i
                      class="fas fa-star ratedStar"
                      onClick={() => setRating(1)}
                    ></i>
                    <i
                      class={
                        rating >= 2 ? "fas fa-star ratedStar" : "far fa-star"
                      }
                      onClick={() => setRating(2)}
                    ></i>
                    <i
                      class={
                        rating >= 3 ? "fas fa-star ratedStar" : "far fa-star"
                      }
                      onClick={() => setRating(3)}
                    ></i>
                    <i
                      class={
                        rating >= 4 ? "fas fa-star ratedStar" : "far fa-star"
                      }
                      onClick={() => setRating(4)}
                    ></i>
                    <i
                      class={
                        rating >= 5 ? "fas fa-star ratedStar" : "far fa-star"
                      }
                      onClick={() => setRating(5)}
                    ></i>
                  </span>
                </div>
                <div className="pt-4">
                  <Label>Your review</Label>
                  <Input
                    className="input mt-2"
                    type="textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <button
                  className="button mt-5"
                  onClick={(e) => handleSubmit(e)}
                >
                  SUBMIT
                </button>
              </Form>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  ) : (
    <div></div>
  );
}

export default Review;
