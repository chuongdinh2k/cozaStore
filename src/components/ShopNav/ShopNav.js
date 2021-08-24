import "./_ShopNav.scss";
import React, { useState, useRef } from "react";
import { Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import ShopNavCollapse from "./ShopNavCollapse";
function ShopNav({ setFilter, setData, filter }) {
  const ref = useRef(null);
  const women = useRef(null);
  const men = useRef(null);
  const watch = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    setIsOpenSearch(false);
  };
  const toggleSearch = () => {
    setIsOpenSearch(!isOpenSearch);
    setIsOpen(false);
  };
  const getCategory = async (ref) => {
    console.log(ref);
    await setFilter({
      ...filter,
      category: ref.current.name,
      pageNumber: 1,
      name: "",
      color: "",
    });
    history.push(`/shop/${ref.current.name}?pageNumber=${filter.pageNumber}`);
  };
  return (
    <div className="ShopNav">
      <Row className="justify-content-between">
        <Col xs={6}>
          <div className="ShopNav__nav-left text-left">
            <button
              className="ShopNav__button"
              ref={ref}
              name="all"
              onClick={() => getCategory(ref)}
            >
              <p className={filter.category === "all" ? "active" : ""}>
                All Products
              </p>
            </button>
            <button
              className="ShopNav__button"
              ref={women}
              name="women"
              onClick={() => getCategory(women)}
            >
              <p className={filter.category === "women" ? "active" : ""}>
                Women
              </p>
            </button>
            <button
              className="ShopNav__button"
              ref={men}
              name="men"
              onClick={() => getCategory(men)}
            >
              <p className={filter.category === "men" ? "active" : ""}>Men</p>
            </button>
            <button
              className="ShopNav__button"
              ref={watch}
              name="watch"
              onClick={() => getCategory(watch)}
            >
              <p className={filter.category === "watch" ? "active" : ""}>
                Watches
              </p>
            </button>
          </div>
        </Col>
        <Col xs={6}>
          <div className="ShopNav-right">
            <div className="d-flex justify-content-end">
              <div
                className="ShopNav__button-right filter"
                style={
                  isOpen
                    ? { backgroundColor: "#F2F2F2", borderColor: "#F2F2F2" }
                    : { backgroundColor: "white" }
                }
                onClick={toggle}
              >
                {!isOpen ? (
                  <i class="fas fa-filter ShopNav__icon"></i>
                ) : (
                  <i class="fas fa-times ShopNav__icon"></i>
                )}
                {isOpen ? <div class="ShopNav__triangle-down"></div> : ""}
              </div>
              <div
                className="ShopNav__button-right search"
                style={
                  isOpenSearch
                    ? { backgroundColor: "#F2F2F2", borderColor: "#F2F2F2" }
                    : { backgroundColor: "white" }
                }
                onClick={toggleSearch}
              >
                {!isOpenSearch ? (
                  <i class="fas fa-search ShopNav__icon"></i>
                ) : (
                  <i class="fas fa-times ShopNav__icon"></i>
                )}
                {isOpenSearch ? <div class="ShopNav__triangle-down"></div> : ""}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <ShopNavCollapse
            isOpen={isOpen}
            isOpenSearch={isOpenSearch}
            setFilter={setFilter}
            filter={filter}
          />
        </Col>
      </Row>
    </div>
  );
}

export default ShopNav;
