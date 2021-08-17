import React, { useEffect, useState } from "react";
import "./_Shop.scss";
import { useSelector, useDispatch } from "react-redux";
import { getFilterProducts } from "../../redux/actions";
import * as api from "../../api";
import { Container } from "reactstrap";
import ShopNav from "../../components/ShopNav/ShopNav";
import ShopProducts from "../../components/ShopProducts/ShopProducts";
import ShopPagination from "../../components/ShopPagination/ShopPagination";
import { useLocation, useParams } from "react-router-dom";

function Shop() {
  let { id } = useParams();
  console.log("id", id);
  const search = useLocation().search;
  console.log("search", search);
  const pageNumber = new URLSearchParams(search).get("pageNumber");
  const color = new URLSearchParams(search).get("color");
  const min = new URLSearchParams(search).get("min");
  const max = new URLSearchParams(search).get("max");
  const q = new URLSearchParams(search).get("q");
  console.log("q", q);
  // const q = new URLSearchParams(search).get("color");
  const [filter, setFilter] = useState({
    category: id ? id : "all",
    pageNumber: pageNumber ? pageNumber : 1,
    min: min ? min : 1,
    max: max ? max : 0,
    rating: 0,
    name: q ? q : "",
    color: color ? color : "",
  });
  const dispatch = useDispatch();
  useEffect(async () => {
    dispatch(
      getFilterProducts.getFilterProductsRequest({
        ...filter,
      })
    );
  }, [dispatch, filter]);
  const [data, setData] = useState();
  return (
    <div className="Shop">
      <Container>
        <ShopNav setFilter={setFilter} filter={filter} setData={setData} />
        <ShopProducts />
        <ShopPagination setFilter={setFilter} filter={filter} />
      </Container>
    </div>
  );
}

export default Shop;
