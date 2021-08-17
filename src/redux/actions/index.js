import { createActions, createAction } from "redux-actions";
import { SHOW_MODAL_AUTH, SHOW_MODAL_QUICK_VIEW } from "../constant";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const userActions = createActions({
  userActionRequest: (payload) => payload,
  userActionSuccess: (payload) => payload,
  userActionError: (err) => err,
});
export const userRegisterActions = createActions({
  userRegisterActionRequest: (payload) => payload,
  userRegisterActionSuccess: (payload) => payload,
  userRegisterActionError: (err) => err,
});
//get Top rating product (4->5 stars);
export const getTopRatingProducts = createActions({
  getTopRatingProductsRequest: undefined,
  getTopRatingProductsSuccess: (payload) => payload,
  getTopRatingProductsError: (err) => err,
});
//get filter product
export const getFilterProducts = createActions({
  getFilterProductsRequest: (payload) => payload,
  getFilterProductsSuccess: (payload) => payload,
  getFilterProductsError: (err) => err,
});
export const getQuickViewProduct = createActions({
  getQuickViewProductRequest: (payload) => payload,
  getQuickViewProductSuccess: (payload) => payload,
  getQuickViewProductError: (err) => err,
});

// add to cart
export const cartActions = createActions({
  addToCart: (payload) => ({
    payload,
  }),
  removeItemFromCart: (payload) => payload,
  plusNumberCartItem: (payload) => payload,
  substractNumberCartItem: (payload) => payload,
  subTotal: undefined,
});
//review
export const productReview = createActions({
  productReviewRequest: (payload) => payload,
  productReviewSuccess: (payload) => payload,
  productReviewError: (err) => err,
  productReviewReset: (err) => err,
});
//add product
export const addProduct = createActions({
  addProductRequest: (payload) => payload,
});
export const shippingActions = createActions({
  shippingAddress: (payload) => payload,
});
export const modalActions = createActions({
  authModal: undefined,
});
export const showAuth = () => ({
  type: SHOW_MODAL_AUTH,
});

export const showQickView = () => ({
  type: SHOW_MODAL_QUICK_VIEW,
});
export const userSignOutAction = () => ({
  type: "USER_SIGN_OUT",
});

/*
  getType(getPosts.getPostSuccess)
  =>  
  {
    type: 'getPostSuccess',
    payload: {
      name: 'Test'
    }
  }
*/
