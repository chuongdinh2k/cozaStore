import "./_ShopProducts.scss";
import React from "react";
import { Row, Col } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import Spinners from "../Spinner";
import { getQuickViewProduct, showQickView } from "../../redux/actions";
import { useHistory } from "react-router-dom";
function ShopProducts() {
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.filterProducts);
  const showQickViewClick = (id) => {
    dispatch(
      getQuickViewProduct.getQuickViewProductRequest({
        id: id,
      })
    );
    dispatch(showQickView());
  };
  const viewDetails = (id) => {
    dispatch(
      getQuickViewProduct.getQuickViewProductRequest({
        id: id,
      })
    );
    history.push(`/detail/${id}`);
  };
  const renderProducts = products.data ? (
    products.data.map((item) => (
      <Col xs={12} sm={6} md={3} key={item._id}>
        <div className="item">
          <div className="image">
            <img src={item.image} alt={item.name} />
            <a onClick={() => showQickViewClick(item._id)}></a>
          </div>
          <p className="productName" onClick={() => viewDetails(item._id)}>
            {item.name}
          </p>
          <p className="productPrice">${item.price}</p>
        </div>
      </Col>
    ))
  ) : (
    <Spinners />
  );
  return (
    <div className="ShopProducts">
      <Row>{renderProducts}</Row>
    </div>
  );
}

export default ShopProducts;
