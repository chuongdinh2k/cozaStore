import React, { useState } from "react";
import { Container, Table, Row, Col, Button, Label, Input } from "reactstrap";
import "./_Cart.scss";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../redux/actions";
import { LOCAL_STORAGE_CART } from "../../redux/constant";
import CartTotal from "./CartTotal";
function Cart() {
  //Handle Change
  // const [subTotal, setSubTotal] = useState(0);
  const cartState = useSelector((state) => state.cart);
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cartState));
  });
  const dispatch = useDispatch();
  const totalAmount = (quantity, price) => {
    return price * quantity;
  };
  const subTotal =
    cartState.length !== 0
      ? cartState.reduce((acc, value) => acc + value.quantity * value.price, 0)
      : 0;
  console.log(subTotal);

  const result =
    cartState.length != 0 ? (
      cartState.map((item) => {
        return (
          <tr key={item._id}>
            <th>
              <img src={item.image} className="Cart__image"></img>
            </th>
            <th>
              <p className="Cart__title">{item.name}</p>
            </th>
            <th>
              <p>$ {item.price}</p>
            </th>
            <th>
              <div class="wrapNumberProduct">
                <div
                  class="plusButton"
                  onClick={() =>
                    dispatch(cartActions.plusNumberCartItem(item._id))
                  }
                ></div>
                <input
                  className="numProduct"
                  type="number"
                  value={item.quantity}
                  min="1"
                />
                <div
                  class="substractButton"
                  onClick={() =>
                    dispatch(cartActions.substractNumberCartItem(item._id))
                  }
                ></div>
              </div>
            </th>

            <th>
              <p>$ {totalAmount(item.quantity, item.price)}</p>
            </th>
            <th>
              <Button
                color="danger"
                onClick={() =>
                  dispatch(cartActions.removeItemFromCart(item._id))
                }
              >
                X
              </Button>
            </th>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colspan="5">CART IS EMPTY!</td>
      </tr>
    );

  return (
    <div className="Cart">
      <Container>
        <p className="Cart__link">
          <span>Home</span>
          <span>{`>`}</span>
          <span>Shopping Cart</span>
        </p>
        <div className="Cart__content">
          <Row>
            <Col xs={12} md={8}>
              <div className="table__item">
                <Table>
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th></th>
                      <th>PRICE</th>
                      <th>QUANTITY</th>
                      <th>TOTAL</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{result}</tbody>
                </Table>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <CartTotal subTotal={subTotal} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Cart;
