/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from "react";
import "./_QuickViewModal.scss";
import { modalState$, quickViewProductState$ } from "../../redux/selector";
import { cartActions, showQickView,getQuickViewProduct } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Label, Col, Row } from "reactstrap";
import Spinners from "../../components/Spinner";
import {useHistory} from 'react-router-dom';
import { renderStar } from "../../utils";
const QuickViewModal = (props) => {
  const {} = props;
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const modalState = useSelector(modalState$);
  const productState = useSelector(quickViewProductState$);
  const toggle = () => dispatch(showQickView());
  const cart = useSelector((state) => state);
  // Handle Change
  const handleMouseOut = () => {
    if (!quantity) {
      setQuantity(1);
    }
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleClickPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleClickSub = () => {
    if (quantity <= 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };
  const viewDetails = (id) => {
    dispatch(
      getQuickViewProduct.getQuickViewProductRequest({
        id: id,
      })
    );
    dispatch(showQickView());
    history.push(`/detail/${id}`);
  };
  return (
    <div>
      <Modal
        isOpen={modalState.isShowQickView}
        toggle={toggle}
        className="QuickViewModal"
      >
        <span className="closeButton">
          <i class="fas fa-window-close icon" onClick={toggle}></i>
        </span>
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
                <h3 style={{cursor:"pointer"}} onClick={() => viewDetails(productState._id)} >{productState.name}</h3>
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
                    <div class="plusButton" onClick={handleClickPlus}></div>
                    <input
                      className="numProduct"
                      type="number"
                      value={quantity}
                      min="1"
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
                      toggle();
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
      </Modal>
    </div>
  );
};

export default QuickViewModal;
