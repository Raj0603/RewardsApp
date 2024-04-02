import {
  WALLET_BALANCE_FAIL,
  WALLET_BALANCE_REQUEST,
  WALLET_BALANCE_SUCCESS,
} from "../constants/walletConstant";

const initialState = {
  fetching: false,
  studentBalance: null,
  error: null,
};

export const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_BALANCE_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null, // Reset error when a new request is made
      };
    case WALLET_BALANCE_SUCCESS:
      return {
        ...state,
        fetching: false,
        studentBalance: action.payload,
        error: null, // Reset error when studentBalance retrieval is successful
      };
    case WALLET_BALANCE_FAIL:
      return {
        ...state,
        fetching: false,
        studentBalance: null, // Reset studentBalance on failure
        error: action.payload,
      };
    default:
      return state;
  }
};