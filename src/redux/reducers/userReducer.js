import INIT_STATE from "../globalState";
import { getType, userActions, userRegisterActions } from "../actions";
import { LOCAL_STORAGE_SHIPPING, LOCAL_STORAGE_USER_INFO } from "../constant";

export default function userReducer(state = INIT_STATE.user, action) {
  switch (action.type) {
    case getType(userActions.userActionSuccess): {
      localStorage.setItem(
        LOCAL_STORAGE_USER_INFO,
        JSON.stringify({ ...action.payload })
      );
      return {
        isLoading: false,
        data: { ...action.payload },
      };
    }
    case getType(userRegisterActions.userRegisterActionSuccess): {
      localStorage.setItem(
        LOCAL_STORAGE_USER_INFO,
        JSON.stringify({ ...action.payload })
      );
      return {
        isLoading: false,
        data: { ...action.payload },
      };
    }
    case "USER_SIGN_OUT": {
      return {
        isLoading: false,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
}
