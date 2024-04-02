import {
  STUDENT_TRANSACTION_SUCCESS,
  STUDENT_TRANSACTION_REQUEST,
  STUDENT_TRANSACTION_FAIL,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
  TEACHER_TRANSACTION_FAIL,
  TEACHER_TRANSACTION_REQUEST,
  TEACHER_TRANSACTION_SUCCESS,
  CLEAR_ERRORS,
  REWARD_TRANSACTION_FAIL,
  REWARD_TRANSACTION_REQUEST,
  REWARD_TRANSACTION_SUCCESS,
} from "../constants/transactionConstant";

export const transactionReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case TEACHER_TRANSACTION_REQUEST:
    case STUDENT_TRANSACTION_REQUEST:
    case REWARD_TRANSACTION_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case TEACHER_TRANSACTION_SUCCESS:
    case STUDENT_TRANSACTION_SUCCESS:
    case REWARD_TRANSACTION_SUCCESS:
      return {
        ...state,
        processing: false,
        success: action.payload.success,
        transaction: action.payload.transaction,
      };
    case TEACHER_TRANSACTION_FAIL:
    case STUDENT_TRANSACTION_FAIL:
    case REWARD_TRANSACTION_FAIL:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const transactionDetailReducer = (
  state = { transactionDetails: {} },
  action
) => {
  switch (action.type) {
    case TRANSACTION_DETAILS_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        processing: false,
        success: action.payload.success,
        creditTransactions: action.payload.credited,
        debitTransactions: action.payload.debited,
      };
    case TRANSACTION_DETAILS_FAIL:
      return {
        ...state,
        processing: false,
        error: action.payload.error,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
