// import { useSelector } from "react-redux"
// import { cartState$ } from "./selector"
// const cartState = useSelector(cartState$);
export const addItemToCart = (state, productState, quantity) => {
  console.log("me");
  const existingCartItem = state.find(
    (cartItem) => cartItem._id === productState._id
  );
  if (existingCartItem) {
    console.log("hello");
    return state.map((cartItem) =>
      cartItem._id === productState._id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          }
        : cartItem
    );
  }
  // localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(state));
  // return [
  //   ...state,
  //   {
  //     ...action.payload.payload.productState,
  //     quantity: action.payload.payload.quantity,
  //   },
  // ];
  return `hello`;
};
