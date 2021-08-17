import React, { useState } from "react";
import "./_CartModel.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CartModel = (props) => {
  const { buttonLabel } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const closeBtn = <i class="fas fa-times" onClick={toggle}></i>;
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="CartModel">
        <ModalHeader toggle={toggle} close={closeBtn}>
          YOUR CART
        </ModalHeader>
        <ModalBody>
          <div className="CartModel__box">
            <div className="CartModel__item">
              <img
                className="CartModel__item-image"
                src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
                alt="cart-image-item"
              ></img>
              <div className="CartModel__item-title">
                <p>White Shirt Pleat</p>
                <p>
                  <span>1</span>x<span>$19.00</span>
                </p>
              </div>
              <Button color="danger">X</Button>
            </div>
            <div className="CartModel__item">
              <img
                className="CartModel__item-image"
                src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
                alt="cart-image-item"
              ></img>
              <div className="CartModel__item-title">
                <p>White Shirt Pleat</p>
                <p>
                  <span>1</span>x<span>$19.00</span>
                </p>
              </div>
              <Button color="danger">X</Button>
            </div>
            <div className="CartModel__item">
              <img
                className="CartModel__item-image"
                src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
                alt="cart-image-item"
              ></img>
              <div className="CartModel__item-title">
                <p>White Shirt Pleat</p>
                <p>
                  <span>1</span>x<span>$19.00</span>
                </p>
              </div>
              <Button color="danger">X</Button>
            </div>
            <div className="CartModel__item">
              <img
                className="CartModel__item-image"
                src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
                alt="cart-image-item"
              ></img>
              <div className="CartModel__item-title">
                <p>White Shirt Pleat</p>
                <p>
                  <span>1</span>x<span>$19.00</span>
                </p>
              </div>
              <Button color="danger">X</Button>
            </div>{" "}
            <div className="CartModel__item">
              <img
                className="CartModel__item-image"
                src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
                alt="cart-image-item"
              ></img>
              <div className="CartModel__item-title">
                <p>White Shirt Pleat</p>
                <p>
                  <span>1</span>x<span>$19.00</span>
                </p>
              </div>
              <Button color="danger">X</Button>
            </div>
            <div className="CartModel__item">
              <img
                className="CartModel__item-image"
                src="https://preview.colorlib.com/theme/cozastore/images/product-01.jpg"
                alt="cart-image-item"
              ></img>
              <div className="CartModel__item-title">
                <p>White Shirt Pleat</p>
                <p>
                  <span>1</span>x<span>$19.00</span>
                </p>
              </div>
              <Button color="danger">X</Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <p className="CartModel__total">Total: 100$</p>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CartModel;
