import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import {itemDetailsReducer, itemReviewsReducer, itemsReducer, newReviewReducer, reviewReducer} from "./reducers/itemReducer"
import {
  allOwnersReducer,
  allStudentsReducer,
  forgotPasswordReducer,
  studentDetailsReducer,
  studentProfileReducer,
  studentReducer,
} from "./reducers/studentReducer";
import { newWarningReducer, teacherReducer, increaseRewards } from "./reducers/teacherReducer";
import {
  formDetailsReducer,
  formReducer,
  newFormReducer,
  updateFormReducer,
} from "./reducers/formReducer";
import { balanceReducer } from "./reducers/walletReducer";
import {
  transactionDetailReducer,
  transactionReducer,
} from "./reducers/transactionReducer";

const reducer = combineReducers({
  student: studentReducer,
  profile: studentProfileReducer,
  forgotPassword: forgotPasswordReducer,
  allStudents: allStudentsReducer,
  studentDetails: studentDetailsReducer,
  allOwners: allOwnersReducer,
  teacher: teacherReducer,
  newForm: newFormReducer,
  allForm: formReducer,
  formDetails: formDetailsReducer,
  updateForm: updateFormReducer,
  studentBalance: balanceReducer,
  newWarning: newWarningReducer,
  transaction: transactionReducer,
  transactionDetails: transactionDetailReducer,
  rewards: increaseRewards,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});

export default store;
