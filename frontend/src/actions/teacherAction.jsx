import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
  LOAD_TEACHER_REQUEST,
  LOAD_TEACHER_SUCCESS,
  LOAD_TEACHER_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_TEACHERS_REQUEST,
  ALL_TEACHERS_SUCCESS,
  ALL_TEACHERS_FAIL,
  ALL_OWNERS_REQUEST,
  ALL_OWNERS_SUCCESS,
  ALL_OWNERS_FAIL,
  DELETE_TEACHER_REQUEST,
  DELETE_TEACHER_SUCCESS,
  DELETE_TEACHER_FAIL,
  DELETE_OWNER_REQUEST,
  DELETE_OWNER_SUCCESS,
  DELETE_OWNER_FAIL,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
  UPDATE_TEACHER_FAIL,
  TEACHER_DETAILS_REQUEST,
  TEACHER_DETAILS_SUCCESS,
  TEACHER_DETAILS_FAIL,
  WARN_STUDENT_FAIL,
  WARN_STUDENT_REQUEST,
  WARN_STUDENT_SUCCESS,
  INCREASE_REWARDS_REQUEST,
  INCREASE_REWARDS_FAIL,
  INCREASE_REWARDS_SUCCESS
} from "../constants/teacherConstant";

import axios from "axios";

//Login Teacher

export const teacherLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `/api/v1/tlogin`,
      { email, password },
      config
    );

    console.log(data);

    dispatch({ type: LOGIN_SUCCESS, payload: data.info });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

//Register Teacher

export const teacherRegister = (teacherData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_TEACHER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/tregister`, teacherData, config);

    console.log(data);

    dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data.info });
  } catch (error) {
    dispatch({
      type: REGISTER_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load teacher

export const loadTeacher = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_TEACHER_REQUEST });

    const { data } = await axios.get(`/api/v1/tme`);

    dispatch({ type: LOAD_TEACHER_SUCCESS, payload: data.teacher });
  } catch (error) {
    dispatch({ type: LOAD_TEACHER_FAIL, payload: error.response.data.message });
  }
};

//Logout teacher

export const logoutTeacher = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/tlogout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

//Update teacher Profile

export const updateTeacherProfile = (teacherData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/tme/update`, teacherData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Forgot Password

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/tpassword/forgot`,
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/tpassword/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Teachers
export const getAllTeachers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TEACHERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/teachers`);

    dispatch({ type: ALL_TEACHERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_TEACHERS_FAIL, payload: error.response.data.message });
  }
};

// get All Owners
export const getAllOwners = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_OWNERS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/owner`);

    dispatch({ type: ALL_OWNERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_OWNERS_FAIL, payload: error.response.data.message });
  }
};

// Delete Owner
export const deleteOwner = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_OWNER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/owner/${id}`);

    dispatch({ type: DELETE_OWNER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_OWNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get  teacher Details
export const getTeacherDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEACHER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/teacher/${id}`);

    dispatch({ type: TEACHER_DETAILS_SUCCESS, payload: data.teacher });
  } catch (error) {
    dispatch({
      type: TEACHER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update teacher
export const updateTeacher = (id, teacherData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEACHER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/teacher/${id}`,
      teacherData,
      config
    );

    dispatch({ type: UPDATE_TEACHER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Teacher
export const deleteTeacher = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEACHER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/teacher/${id}`);

    dispatch({ type: DELETE_TEACHER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_TEACHER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Warn Students

export const warnStudent = (warning) => async (dispatch) => {
  try {
    dispatch({ type: WARN_STUDENT_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/twarnings`, warning, config);

    dispatch({
      type: WARN_STUDENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: WARN_STUDENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Increase Rewards

export const increaseRewards = (amount) => async (dispatch) => {
  try {
    dispatch({ type: INCREASE_REWARDS_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/v1/increaserewards`, amount, config);

    dispatch({
      type: INCREASE_REWARDS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: INCREASE_REWARDS_FAIL,
      payload: error.response.data.message,
    });
  }
};
