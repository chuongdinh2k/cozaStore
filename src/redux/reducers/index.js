import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import modalReducer from "./modalReducer";
import productReducer from "./productReduct";
import shippingReducer from "./shippingReducer";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  modal: modalReducer,
  cart: cartReducer,
  shipping: shippingReducer,
});
export default rootReducer;
