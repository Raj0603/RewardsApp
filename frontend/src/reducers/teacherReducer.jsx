import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERRORS,
  REGISTER_TEACHER_FAIL,
  REGISTER_TEACHER_REQUEST,
  REGISTER_TEACHER_SUCCESS,
  LOAD_TEACHER_REQUEST,
  LOAD_TEACHER_SUCCESS,
  LOAD_TEACHER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
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
  DELETE_TEACHER_RESET,
  UPDATE_TEACHER_REQUEST,
  UPDATE_TEACHER_SUCCESS,
  UPDATE_TEACHER_FAIL,
  UPDATE_TEACHER_RESET,
  TEACHER_DETAILS_REQUEST,
  TEACHER_DETAILS_SUCCESS,
  TEACHER_DETAILS_FAIL,
  DELETE_OWNER_REQUEST,
  DELETE_OWNER_SUCCESS,
  DELETE_OWNER_FAIL,
  DELETE_OWNER_RESET,
  WARN_STUDENT_REQUEST,
  WARN_STUDENT_SUCCESS,
  WARN_STUDENT_FAIL,
  WARN_STUDENT_RESET,
  INCREASE_REWARDS_REQUEST,
  INCREASE_REWARDS_SUCCESS,
  INCREASE_REWARDS_FAIL,
} from "../constants/teacherConstant";

export const teacherReducer = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_TEACHER_REQUEST:
    case LOAD_TEACHER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_TEACHER_SUCCESS:
    case LOAD_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        teacher: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        teacher: null,
        isAuthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        teacher: null,
        error: action.payload,
      };

    case LOAD_TEACHER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        teacher: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const teacherProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_TEACHER_REQUEST:
    case DELETE_TEACHER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_TEACHER_FAIL:
    case DELETE_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_TEACHER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_TEACHER_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const allTeachersReducer = (state = { teachers: [] }, action) => {
  switch (action.type) {
    case ALL_TEACHERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: action.payload,
      };
    case ALL_TEACHERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_TEACHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_TEACHER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TEACHER_RESET:
      return {
        ...state,
        isDeleted: false,
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
export const allOwnersReducer = (state = { owners: [] }, action) => {
  switch (action.type) {
    case ALL_OWNERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_OWNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        owners: action.payload,
      };
    case ALL_OWNERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_OWNER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_OWNER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_OWNER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_OWNER_RESET:
      return {
        ...state,
        isDeleted: false,
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

export const teacherDetailsReducer = (state = { teacher: {} }, action) => {
  switch (action.type) {
    case TEACHER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEACHER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        teacher: action.payload,
      };

    case TEACHER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const newWarningReducer = (state = {}, action) => {
  switch (action.type) {
    case WARN_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WARN_STUDENT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case WARN_STUDENT_FAIL:
      return {
        ...state,
        loading: false,
        warnError: action.payload,
      };
    case WARN_STUDENT_RESET:
      return {
        ...state,
        success: false,
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

export const increaseRewards = (state = {}, action) => {
  switch (action.type) {
    case INCREASE_REWARDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INCREASE_REWARDS_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case INCREASE_REWARDS_FAIL:
      return {
        ...state,
        loading: false,
        rewardError: action.payload,
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
