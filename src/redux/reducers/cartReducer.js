import { cartActions, getType } from "../actions";
import { addItemToCart } from "../utils";
import INIT_STATE from "../globalState";
import { LOCAL_STORAGE_CART } from "../constant";
const cartReducer = (state = INIT_STATE.cart, action) => {
  switch (action.type) {
    case getType(cartActions.addToCart):
      const existingCartItem = state.find(
        (cartItem) => cartItem._id === action.payload.payload.productState._id
      );
      if (existingCartItem) {
        return state.map((cartItem) =>
          cartItem._id === action.payload.payload.productState._id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + action.payload.payload.quantity,
              }
            : cartItem
        );
      }
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state));
      return [
        ...state,
        {
          ...action.payload.payload.productState,
          quantity: action.payload.payload.quantity,
        },
      ];

    case getType(cartActions.plusNumberCartItem): {
      return state.map((cartItem) =>
        cartItem._id === action.payload
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      );
    }

    case getType(cartActions.substractNumberCartItem): {
      return state.map((cartItem) => {
        if (cartItem._id === action.payload && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        } else return cartItem;
      });
    }
    case getType(cartActions.removeItemFromCart): {
      return state.filter((item) => item._id !== action.payload);
    }
    case getType(cartActions.subTotal): {
      return {
        ...state,
        subtotal: state.reduce(function (acc, currenValue) {
          return acc + (currenValue.price + currenValue.quantity);
        }),
      };
    }
    default:
      return state;
  }
};
export default cartReducer;
