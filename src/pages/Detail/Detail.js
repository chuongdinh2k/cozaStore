/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from "react";
import "./_Detail.scss";
import { quickViewProductState$ } from "../../redux/selector";
import {
  cartActions,
  getQuickViewProduct,
  productReview,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Label, Col, Row, Container } from "reactstrap";
import Spinners from "../../components/Spinner";
import { renderStar } from "../../utils";
import Review from "../../components/Review/Review";
import { useParams } from "react-router-dom";
const Detail = (props) => {
  // const userinfo = useSelector((state) => state.user.user.data);
  // const user = userinfo ? userinfo.accessToken : "asdas";
  const review = useSelector((state) => state.product.review);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const productState = useSelector(quickViewProductState$);
  const handleMouseOut = () => {
    if (!quantity) {
      setQuantity(1);
    }
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleClickPlus = (countInStock) => {
    if (quantity >= countInStock) {
      setQuantity(countInStock);
      return;
    }
    setQuantity(quantity + 1);
  };
  const handleClickSub = () => {
    if (quantity <= 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };
  useEffect(() => {
    dispatch(
      getQuickViewProduct.getQuickViewProductRequest({
        id: id,
      })
    );
  }, [dispatch, id]);
  return (
    <div className="Detail">
      <Container>
        <p>Home </p>
        {!productState ? (
          <Spinners />
        ) : (
          <Row>
            <Col xs={12} md={6}>
              <div className="image">
                <img src={productState.image} alt={productState.name} />
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="detail">
                <h3>{productState.name}</h3>
                <p className="price">${productState.price}</p>
                <p className="description">
                  Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus
                  ligula. Mauris consequat ornare feugiat.
                </p>
                <p>Number in stock: {productState.countInStock}</p>
                {renderStar(productState.rating)}
                <div className="form">
                  <Label className="label" for="size">
                    Choose a Size:{" "}
                  </Label>
                  <select className="select" name="sizeList">
                    <option value="s">Size S</option>
                    <option value="m">Size M</option>
                    <option value="l">Size L</option>
                    <option value="xl">Size XL</option>
                  </select>
                  <div class="wrapNumberProduct">
                    <div
                      class="plusButton"
                      onClick={() => handleClickPlus(productState.countInStock)}
                    ></div>
                    <input
                      className="numProduct"
                      type="number"
                      value={quantity}
                      min="1"
                      max={productState.countInStock}
                      onChange={handleChange}
                      onMouseOut={handleMouseOut}
                    />
                    <div class="substractButton" onClick={handleClickSub}></div>
                  </div>
                  <button
                    className="button"
                    onClick={() => {
                      dispatch(
                        cartActions.addToCart({ productState, quantity })
                      );
                      setQuantity(1);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        )}
        <Review productState={productState} review={review} />
      </Container>
    </div>
  );
};

export default Detail;
