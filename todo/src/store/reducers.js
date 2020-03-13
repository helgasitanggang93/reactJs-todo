import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
    FETCH_TODO_DATA, 
    IS_DETAIL, 
    IS_GOOGLE_SIGN_IN,
    IS_LOADING, 
    IS_LOGIN_REGISTER, 
    IS_LOGIN, 
    IS_REGISTER, 
    FORM_MODAL_HANDLER, 
    ITEM_ERROR, 
    FETCH_DETAIL_TODO} from './actionsType';

const initialState = {
  todos: [],
  detail: {},
  errorMessage: "",
  isLoading: false,
  isDetail: false,
  isForm: false,
  isLogin: false,
  isRegister: false,
  isLoginRegister: false,
  isGoogleSignIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODO_DATA: {
      return {
        ...state,
        todos: [...action.payload],
        isLoading: false
      };
    }
    case FETCH_DETAIL_TODO: {
      return {
        ...state,
        detail: { ...action.payload }
      };
    }
    case IS_DETAIL: {
      return {
        ...state,
        isDetail: action.payload
      };
    }
    case IS_GOOGLE_SIGN_IN: {
      return {
        ...state,
        isGoogleSignIn: action.payload
      };
    }
    case IS_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case IS_LOGIN_REGISTER: {
      return {
        ...state,
        isLoginRegister: action.payload,
        isLoading: false
      };
    }
    case IS_LOGIN: {
      return {
        ...state,
        isLogin: action.payload
      };
    }
    case IS_REGISTER: {
      return {
        ...state,
        isRegister: action.payload
      };
    }
    case ITEM_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      };
    }
    case FORM_MODAL_HANDLER: {
      return {
        ...state,
        isForm: action.payload
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  reducer: reducer,
  form: formReducer
});
