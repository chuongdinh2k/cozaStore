import INIT_STATE from "../globalState";
import {
  getType,
  getTopRatingProducts,
  getQuickViewProduct,
  getFilterProducts,
  productReview,
} from "../actions";

export default function productReducer(state = INIT_STATE.product, action) {
  switch (action.type) {
    case getType(getTopRatingProducts.getTopRatingProductsSuccess): {
      return {
        ...state,
        topRating: [...action.payload],
      };
    }
    case getType(getQuickViewProduct.getQuickViewProductSuccess): {
      return {
        ...state,
        quickView: {
          ...action.payload,
        },
      };
    }
    case getType(getFilterProducts.getFilterProductsSuccess): {
      return {
        ...state,
        filterProducts: {
          data: [...action.payload.categories],
          pages: action.payload.pages,
          page: action.payload.page,
        },
      };
    }
    case getType(productReview.productReviewSuccess): {
      return {
        ...state,
        review: {
          ...action.payload,
        },
      };
    }
    case getType(productReview.productReviewError): {
      return {
        ...state,
        message: action.payload,
      };
    }
    case getType(productReview.productReviewReset): {
      return {
        ...state,
        review: null,
        message: null,
      };
    }
    // case 'USER_SIGN_OUT':{
    //     // localStorage.removeItem(LOCAL_STORAGE_USER_INFO);
    //     return {
    //         user:{
    //             isLoading:false,
    //             data:null
    //         },
    //     }
    // }
    default: {
      return state;
    }
  }
}
