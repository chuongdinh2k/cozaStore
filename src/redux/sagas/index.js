import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";
import { toast } from "react-toastify";
// login
function* fetchUserSaga(action) {
  try {
    const user = yield call(api.userAuthLogin, action.payload);
    yield put(actions.userActions.userActionSuccess(user.data));
    toast.info(`😎 Hi ${user.data.name}, welcome come back! `, {
      position: "top-center",
      autoClose: 1000,
      progress: 0,
    });
  } catch (err) {
    console.log(err.response.data.message);
    toast.error(`Oops ${err.response.data.message}`, {
      position: "top-center",
      autoClose: 5000,
      progress: 0,
    });
    yield put(actions.userActions.userActionError(err));
  }
}
//register
function* fetchUserRegisterSaga(action) {
  try {
    const user = yield call(api.userAuthRegister, action.payload);
    yield put(actions.userRegisterActions.userRegisterActionSuccess(user.data));
    toast.info(`🎉 Hi ${user.data.name}, Let start to buy! `, {
      position: "top-center",
      autoClose: 4000,
    });
  } catch (err) {
    console.log(err.response.data.message);
    toast.error(`Oops ${err.response.data.message}`, {
      position: "top-center",
      autoClose: 5000,
      progress: 0,
    });
    yield put(actions.userRegisterActions.userRegisterActionError(err));
  }
}

//get topRating products
function* fetchTopRatingProductsSaga(action) {
  try {
    const product = yield call(api.productTopRating);
    console.log("topRating", product.data.product);
    yield put(
      actions.getTopRatingProducts.getTopRatingProductsSuccess(
        product.data.product
      )
    );
  } catch (err) {
    console.log(err);
    yield put(actions.getTopRatingProducts.getTopRatingProductsError(err));
  }
}
// filter product
function* fectFilterProductsSaga(action) {
  // const productFilter = () =>
  //   axios.get(`${api.URL}/api/product/filter/${action.payload}`);
  try {
    const product = yield call(api.productFilter, action.payload);
    yield put(actions.getFilterProducts.getFilterProductsSuccess(product.data));
  } catch (err) {
    console.log(err);
    yield put(actions.getFilterProducts.getFilterProductsError(err));
  }
}
//get detail product by id
function* fetchQuickViewProductSaga(action) {
  try {
    const product = yield call(api.productDetail, action.payload);
    yield put(
      actions.getQuickViewProduct.getQuickViewProductSuccess(product.data)
    );
  } catch (err) {
    console.log(err.code);
    yield put(actions.getQuickViewProduct.getQuickViewProductError(err));
  }
}
//review products
function* fetchReviewProductsSaga(action) {
  try {
    const product = yield call(api.productReview, action.payload);
    console.log("review", product);
    yield put(actions.productReview.productReviewSuccess(product.data));
    toast.success(`Your review has been created successfully!`, {
      position: "top-center",
      autoClose: 1500,
      progress: 0,
    });
  } catch (err) {
    console.log("error", err.response.data.message);
    yield put(
      actions.productReview.productReviewError(err.response.data.message)
    );
    toast.error(`${err.response.data.message}!`, {
      position: "top-center",
      autoClose: 1500,
      progress: 0,
    });
  }
}
function* fetchPostProductSga(action) {
  try {
    const productRes = yield call(api.postProduct, action.payload);
    console.log("product", productRes);
    if (productRes) {
      toast.success(`add product successfully!`);
    }
    // toast.success(`add product successfully!`);
  } catch (err) {
    toast.error(`add product successfully!`);
  }
}
//toastify add to cart
function* toastAlert(action) {
  toast.success(
    `😁 Added ${action.payload.payload.productState.name} to cart successfully`
  );
}
function* mySaga() {
  yield takeLatest(actions.userActions.userActionRequest, fetchUserSaga);
  yield takeLatest(
    actions.userRegisterActions.userRegisterActionRequest,
    fetchUserRegisterSaga
  );
  yield takeLatest(
    actions.getTopRatingProducts.getTopRatingProductsRequest,
    fetchTopRatingProductsSaga
  );
  yield takeLatest(
    actions.getFilterProducts.getFilterProductsRequest,
    fectFilterProductsSaga
  );
  yield takeLatest(
    actions.getQuickViewProduct.getQuickViewProductRequest,
    fetchQuickViewProductSaga
  );
  yield takeLatest(
    actions.productReview.productReviewRequest,
    fetchReviewProductsSaga
  );
  yield takeLatest(actions.addProduct.addProductRequest, fetchPostProductSga);
  yield takeLatest(actions.cartActions.addToCart, toastAlert);
}

//generator function

export default mySaga;
