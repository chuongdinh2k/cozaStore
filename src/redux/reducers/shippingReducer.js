import { getType, shippingActions } from "../actions";
import INIT_STATE from "../globalState";

const shippingReducer = (state = INIT_STATE.shipping, action) => {
  switch (action.type) {
    case getType(shippingActions.shippingAddress): {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
export default shippingReducer;
