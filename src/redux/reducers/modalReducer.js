import { getType, modalAction, modalActions } from "../actions";
import { SHOW_MODAL_AUTH, SHOW_MODAL_QUICK_VIEW } from "../constant";
import INIT_STATE from "../globalState";

const modalReducer = (state = INIT_STATE.modal, action) => {
  switch (action.type) {
    case SHOW_MODAL_QUICK_VIEW: {
      return {
        ...state,
        isShowQickView: !state.isShowQickView,
      };
    }
    case SHOW_MODAL_AUTH: {
      return {
        ...state,
        isShowAuthModal: !state.isShowAuthModal,
      };
    }
    case getType(modalActions.authModal): {
      console.log(`here`);
      return {
        ...state,
        isShowAuthModal: true,
      };
    }
    default:
      return state;
  }
};
export default modalReducer;
