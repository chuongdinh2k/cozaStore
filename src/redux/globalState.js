import { LOCAL_STORAGE_CART, LOCAL_STORAGE_USER_INFO } from "./constant";

const userStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_INFO));
const cartStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART));
const INIT_STATE = {
  user: {
    isLoading: false,
    data: userStorage ? userStorage : null,
  },
  product: {
    topRating: null,
    quickView: null,
    filterProducts: [],
    review: null,
  },
  modal: {
    isShowQickView: false,
    isShowAuthModal: false,
  },
  cart: cartStorage ? cartStorage : [],
  shipping: [],
};
export default INIT_STATE;
