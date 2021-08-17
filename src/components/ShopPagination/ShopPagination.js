import React, { useRef } from "react";
import "./_ShopPagination.scss";
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const ShopPagination = ({ filter, setFilter }) => {
  //get url
  const url = window.location.pathname;
  const history = useHistory();
  const pageState = useSelector((state) => state.product.filterProducts);
  console.log(pageState.pages);
  const getPage = (e) => {
    setFilter({
      ...filter,
      pageNumber: e.target.innerHTML,
    });
    // history.push(`${url}/${filter.category}?pageNumber=${e.target.innerHTML}`);
    history.push(`${url}?pageNumber=${e.target.innerHTML}`);
  };
  const renderPages = [...Array(pageState.pages)].map((e, i) => (
    <PaginationItem
      key={i}
      className={filter.pageNumber == i + 1 ? "active" : ""}
    >
      <PaginationLink onClick={(e) => getPage(e)}>{i + 1}</PaginationLink>
    </PaginationItem>
  ));
  return (
    <div className="ShopPagination">
      <Row className="justify-content-center">
        <Col xs={4}>
          <Pagination
            className="d-flex justify-content-center"
            aria-label="Page navigation"
          >
            <PaginationItem>
              <PaginationLink previous href="#" />
            </PaginationItem>
            {renderPages}
            <PaginationItem>
              <PaginationLink next href="#" />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    </div>
  );
};

export default ShopPagination;
