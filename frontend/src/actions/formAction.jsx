import {
  CREATE_FORM_REQUEST,
  CREATE_FORM_SUCCESS,
  CREATE_FORM_FAIL,
  STUDENT_FORM_FAIL,
  STUDENT_FORM_REQUEST,
  STUDENT_FORM_SUCCESS,
  TEACHER_FORM_FAIL,
  TEACHER_FORM_REQUEST,
  TEACHER_FORM_SUCCESS,
  TEACHER_FORM_UPDATE_FAIL,
  TEACHER_FORM_UPDATE_SUCCESS,
  TEACHER_FORM_UPDATE_REQUEST,
  FORM_DETAILS_FAIL,
  FORM_DETAILS_REQUEST,
  FORM_DETAILS_SUCCESS,
  FORM_DELETE_FAIL,
  FORM_DELETE_REQUEST,
  FORM_DELETE_SUCCESS,
  CLEAR_ERRORS
} from "../constants/formConstant";

import axios from "axios";

// create form

export const createForm = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FORM_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const { data } = await axios.post(`/api/v1/sendform`, formData, config);

    dispatch({
      type: CREATE_FORM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FORM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// student form request

export const studentForm = () => async (dispatch) => {
  try {
    dispatch({ type: STUDENT_FORM_REQUEST });

    const { data } = await axios.get("/api/v1/sform");

    dispatch({ type: STUDENT_FORM_SUCCESS, payload: data.studentForm });
  } catch (error) {
    dispatch({
      type: STUDENT_FORM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// teacher form request

export const teacherForm = () => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_FORM_REQUEST });

    const { data } = await axios.get("/api/v1/tform");

    dispatch({ type: TEACHER_FORM_SUCCESS, payload: data.teacherForm });
  } catch (error) {
    dispatch({
      type: TEACHER_FORM_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get form details

export const getFormDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FORM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/formdetails/${id}`);

    dispatch({
      type: FORM_DETAILS_SUCCESS,
      payload: data.form,
    });
  } catch (error) {
    dispatch({
      type: FORM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Form

export const updateForm = (id, formData) => async (dispatch) => {
    try {
      dispatch({ type: TEACHER_FORM_UPDATE_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(
        `/api/v1/updateform/${id}`,
        formData,
        config
      );
  
      dispatch({
        type: TEACHER_FORM_UPDATE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: TEACHER_FORM_UPDATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// delete form request

export const deleteForm = (id) => async (dispatch) =>{
  try {
    dispatch({ type: FORM_DELETE_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/deleteform/${id}`,
    );

    dispatch({
      type: FORM_DELETE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: FORM_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };