import React, { useState, useRef } from "react";
import "./_ShoNavCollapse.scss";
import { Col, Row, Card, CardBody, Collapse } from "reactstrap";
import { useHistory } from "react-router-dom";
function ShopNavCollapse({ isOpen, isOpenSearch, filter, setFilter }) {
  const [price, setPrice] = useState({
    min: 1,
    max: 0,
  });
  console.log(price);
  const history = useHistory();
  const SortBy = ["Default", "Price: Low to High", "Price: High to Low"];
  const AllPrice = [
    { min: "1.00", max: "50.00" },
    { min: "51.00", max: "100.00" },
    { min: "101.00", max: "150.00" },
    // { min: "151.00" },
  ];
  const Color = ["black", "blue", "gray", "yellow", "white", "pink"];
  const Type = ["1 Stars", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];
  const render = (array) => {
    return array.map((e, i) => (
      <li key={i} className="ShopNavCollapse__menu-item">
        <a className="ShopNavCollapse__menu-link">{e}</a>
      </li>
    ));
  };
  const [searchValue, setSearchValue] = useState("");
  const [color, setColor] = useState("");
  const [rating, setRating] = useState(1);
  const resetFilterValue = () => {
    setFilter({
      ...filter,
      color: "",
      searchValue: "",
      rating: 0,
      pageNumber: 1,
      min: 1,
      max: 0,
      rating: 1,
    });
    setColor("");
    setPrice({
      min: 1,
      max: 0,
    });
    history.push(`/shop/${filter.category}?pageNumber=${filter.pageNumber}`);
  };
  const getFilterValue = () => {
    // push value filter to URL
    history.push(
      `/shop/${filter.category}?pageNumber=${filter.pageNumber}&min=${price.min}&max=${price.max}&color=${color}&rating=${rating}`
    );
    // get value of filter result
    setFilter({
      ...filter,
      color: color,
      searchValue: "",
      rating: rating,
      pageNumber: 1,
      min: price.min,
      max: price.max,
    });
  };
  // filter search
  const getFilterSearch = () => {
    setFilter({
      category: "all",
      pageNumber: 1,
      min: 1,
      max: 0,
      rating: 1,
      color: "",
      name: searchValue,
    });
    history.push(
      `/shop/${filter.category}?pageNumber=${filter.pageNumber}&q=${searchValue}`
    );
  };
  // console.log(color);
  return (
    <div className="ShopNavCollapse pt-5 pt-xs-2">
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>
            <Row>
              <Col xs={12} md={3}>
                <h4>Sort By</h4>
                <ul className="ShopNavCollapse__menu">{render(SortBy)}</ul>
              </Col>
              <Col xs={12} md={3}>
                <h4>ALL</h4>
                <ul className="ShopNavCollapse__menu">
                  {/* {render(Color)} */}
                  {AllPrice.map((e, i) => (
                    <li key={i} className="ShopNavCollapse__menu-item d-flex">
                      <a
                        className={
                          price.min === e.min
                            ? "ShopNavCollapse__menu-link activeFilter"
                            : "ShopNavCollapse__menu-link"
                        }
                        onClick={() =>
                          setPrice({
                            min: e.min,
                            max: e.max,
                          })
                        }
                      >
                        ${e.min} - ${e.max}
                      </a>
                    </li>
                  ))}
                  <li className="ShopNavCollapse__menu-item d-flex">
                    <a
                      className={
                        price.min === 151
                          ? "ShopNavCollapse__menu-link activeFilter"
                          : "ShopNavCollapse__menu-link"
                      }
                      onClick={() =>
                        setPrice({
                          min: 151,
                          max: 10000,
                        })
                      }
                    >
                      $151.00+
                    </a>
                  </li>
                </ul>
              </Col>
              <Col xs={12} md={3}>
                <h4>Color</h4>
                <ul className="ShopNavCollapse__menu">
                  {/* {render(Color)} */}
                  {Color.map((e, i) => (
                    <li key={i} className="ShopNavCollapse__menu-item d-flex">
                      <span
                        className="ShopNavCollapse__menu-color"
                        style={{ backgroundColor: `${e}` }}
                      ></span>
                      <a
                        onClick={(e) => setColor(e.target.innerHTML)}
                        className={
                          color === e
                            ? "ShopNavCollapse__menu-link activeFilter"
                            : "ShopNavCollapse__menu-link"
                        }
                      >
                        {e}
                      </a>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col xs={12} md={3}>
                <h4>Star</h4>
                {Type.map((e, i) => (
                  <li key={i} className="ShopNavCollapse__menu-item d-flex">
                    <a className="ShopNavCollapse__menu-link type">{e}</a>
                  </li>
                ))}
              </Col>
              {/* set filter button */}
              <Col xs={12} md={12}>
                <button
                  className="ShopNavCollapse__button"
                  onClick={() => getFilterValue()}
                >
                  OK
                </button>
                <button
                  style={{ marginLeft: "2rem" }}
                  className="ShopNavCollapse__button"
                  onClick={() => resetFilterValue()}
                >
                  Reset
                </button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Collapse>
      <Collapse isOpen={isOpenSearch}>
        <Card className="Search">
          <CardBody>
            <div className="ShopNavCollapse__Search d-flex">
              <button
                className="ShopNavCollapse__Search-button"
                onClick={() => getFilterSearch()}
              >
                <i class="fas fa-search"></i>
              </button>
              <input
                className="ShopNavCollapse__Search-input"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default ShopNavCollapse;
