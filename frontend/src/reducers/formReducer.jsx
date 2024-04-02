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
    TEACHER_FORM_UPDATE_RESET,
    FORM_DETAILS_FAIL,
    FORM_DETAILS_REQUEST,
    FORM_DETAILS_SUCCESS,
    FORM_DELETE_FAIL,
    FORM_DELETE_REQUEST,
    FORM_DELETE_SUCCESS,
    FORM_DELETE_RESET,
    CLEAR_ERRORS
  } from "../constants/formConstant";

  export const newFormReducer = (state = { form: {} }, action) => {
    switch (action.type) {
      case CREATE_FORM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_FORM_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          form: action.payload.form,
        };
      case CREATE_FORM_FAIL:
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

  // Requesting form

  export const formReducer = (state = { forms: [] }, action) => {
    switch (action.type) {
      case STUDENT_FORM_REQUEST:
      case TEACHER_FORM_REQUEST:
        return {
          loading: true,
          forms: [],
        };
      case STUDENT_FORM_SUCCESS:
        return {
          loading: false,
          forms: action.payload,
        };
  
      case TEACHER_FORM_SUCCESS:
        return {
          loading: false,
          forms: action.payload,
        };
      case STUDENT_FORM_FAIL:
      case TEACHER_FORM_FAIL:
        return {
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


// Update Form

export const updateFormReducer = (state = {}, action) => {
  switch (action.type) {
    case TEACHER_FORM_UPDATE_REQUEST:
    case FORM_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEACHER_FORM_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case FORM_DELETE_SUCCESS:
      return{
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case TEACHER_FORM_UPDATE_FAIL:
    case FORM_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TEACHER_FORM_UPDATE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case FORM_DELETE_RESET:
      return{
        ...state,
        isDeleted: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//form details

export const formDetailsReducer = (state = { form: {} }, action) => {
  switch (action.type) {
    case FORM_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case FORM_DETAILS_SUCCESS:
      return {
        loading: false,
        form: action.payload,
      };
    case FORM_DETAILS_FAIL:
      return {
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

// delete form



  