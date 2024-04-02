import axios from "axios";
import {
  CLEAR_ERRORS,
  REWARD_TRANSACTION_FAIL,
  REWARD_TRANSACTION_REQUEST,
  REWARD_TRANSACTION_SUCCESS,
  STUDENT_TRANSACTION_FAIL,
  STUDENT_TRANSACTION_REQUEST,
  STUDENT_TRANSACTION_SUCCESS,
  TEACHER_TRANSACTION_FAIL,
  TEACHER_TRANSACTION_REQUEST,
  TEACHER_TRANSACTION_SUCCESS,
  TRANSACTION_DETAILS_FAIL,
  TRANSACTION_DETAILS_REQUEST,
  TRANSACTION_DETAILS_SUCCESS,
} from "../constants/transactionConstant";

// teacher transaction

export const teacherTransactions = (tdata) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_TRANSACTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/ttransaction`, tdata, config);

    dispatch({
      type: TEACHER_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEACHER_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// reward transaction

export const rewardTransactions = (rdata) => async (dispatch) => {
  try {
    dispatch({ type: REWARD_TRANSACTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/rewardtransaction`,
      rdata,
      config
    );

    dispatch({
      type: REWARD_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REWARD_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// student transaction

export const studentTransactions = (sdata) => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_TRANSACTION_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/v1/studenttransaction",
      sdata,
      config
    );

    dispatch({
      type: STUDENT_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all transaction

export const getTransaction = () => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/gettransaction`);

    dispatch({
      type: TRANSACTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRANSACTION_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// clear errors

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
