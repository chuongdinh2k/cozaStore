import axios from "axios";
import { useSelector } from "react-redux";
// const userToken = useSelector((state) => state.user);
export const URL = "https://mern-app-saleweb.herokuapp.com";
// export const URL = "http://localhost:5000";
//login api
export const userAuthLogin = (payload) =>
  axios.post(`${URL}/api/auth/login`, payload);

//register api
export const userAuthRegister = (payload) =>
  axios.post(`${URL}/api/auth/register`, payload);

//get top Rating product
export const productTopRating = () => axios.get(`${URL}/api/product/topRating`);

//get detail by id
export const productDetail = (payload) =>
  axios.post(`${URL}/api/product/quickview`, payload);

// filter products
export const productFilter = (payload) =>
  axios.get(
    `${URL}/api/product/filter/${payload.category}?pageNumber=${payload.pageNumber}&min=${payload.min}&max=${payload.max}&rating=${payload.rating}&name=${payload.name}&color=${payload.color}`
  );
//review
export const productReview = (payload) =>
  axios.post(
    `${URL}/api/product/${payload.id}/reviews`,
    {
      rating: payload.rating,
      comment: payload.comment,
    },
    {
      headers: { Authorization: `Bearer ${payload.user}` },
    }
  );

//post product
export const postProduct = async (payload) => {
  await axios.post(`${URL}/api/product/upload`, payload.formData, {
    headers: {
      Authorization: `Bearer ${payload.user}`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Max-Age": "86400",
    },
  });
};
// get user history orders
export const getOwnOrdersApi = `${URL}/api/order/mine`;
// ghn api
// url get province
export const ghn_province =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";

// url get district
export const ghn_district =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
//url get ward
export const ghn_ward =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id";
