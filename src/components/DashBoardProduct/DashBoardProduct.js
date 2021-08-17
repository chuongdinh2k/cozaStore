import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Col, Input, Row, Table } from "reactstrap";
import { getFilterProducts } from "../../redux/actions";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";
import ShopPagination from "../ShopPagination/ShopPagination";
import Spinners from "../Spinner";
import "./_DashBoardProduct.scss";
import axios from "axios";
import AddProduct from "../AddProduct/AddProduct";
function DashBoardProduct({ icon, name }) {
  // state in data
  //get url
  const url = window.location.pathname;
  //get product list
  const productList = useSelector((state) => state.product.filterProducts);
  console.log(productList.data);
  //query on URL
  let { id } = useParams();
  const search = useLocation().search;
  const pageNumber = new URLSearchParams(search).get("pageNumber");
  const color = new URLSearchParams(search).get("color");
  const min = new URLSearchParams(search).get("min");
  const max = new URLSearchParams(search).get("max");
  const q = new URLSearchParams(search).get("q");

  //filter state
  const [filter, setFilter] = useState({
    category: id ? id : "all",
    pageNumber: pageNumber ? pageNumber : 1,
    min: min ? min : 1,
    max: max ? max : 0,
    rating: 0,
    name: q ? q : " ",
    color: color ? color : "",
  });

  //action
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(
      getFilterProducts.getFilterProductsRequest({
        ...filter,
      })
    );
  }, [dispatch, filter]);
  const renderProductList = productList.data ? (
    productList.data.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <img
              src={item.image}
              alt={item.name}
              className="DashBoardProduct__table-image"
            />
          </td>
          <td>{item.name}</td>
          <td>${item.price}</td>
          <td>{item.countInStock}</td>
          <td>
            <Button color="success">Edit</Button>
          </td>
          <td>
            <Button color="danger">Delete</Button>
          </td>

          {/* <td>{item.rating}</td> */}
        </tr>
      );
    })
  ) : (
    <Spinners />
  );
  return (
    <div>
      <DashBoardTopHeader icon={icon} name={name} />
      <div className="DashBoardProduct">
        <h2>Add new product:</h2>
        <AddProduct />
        <Table className="DashBoardProduct__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count In Stock</th>
              {/* <th>Rating</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{renderProductList}</tbody>
        </Table>
        <ShopPagination setFilter={setFilter} filter={filter} />
      </div>
    </div>
  );
}

export default DashBoardProduct;
