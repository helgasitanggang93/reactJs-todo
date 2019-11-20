import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
const initialState = {
    todos: [],
    detail: {},
    errorMessage: '',
    isLoading: false,
    isDetail: false,
    isForm: false,
    isLogin: false,
    isRegister: false,
    isLoginRegister: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_TODO_DATA': {
            return {
                ...state,
                todos: [...action.payload]
            }
        }
        case 'FETCH_DETAIL_TODO': {
            return {
                ...state,
                detail: {...action.payload},
            }
        }
        case 'IS_DETAIL': {
            return {
                ...state,
                isDetail: action.payload
            }
        }
        case 'IS_LOGIN_REGISTER': {
            return {
                ...state,
                isLoginRegister: action.payload
            }
        }
        case 'IS_LOGIN': {
            return {
                ...state,
                isLogin: action.payload
            }
        }
        case 'IS_REGISTER': {
            return {
                ...state,
                isRegister: action.payload
            }
        }
        case 'FETCH_UPDATE_DONE': {
            return {
                ...state,
                detail: action.payload
            }
        }
        case 'ITEM_ERROR': {
            return {
                ...state,
                errorMessage: action.payload
            }
        }
        case 'FORM_MODAL_HANDLER' : {
            return {
                ...state,
                isForm : action.payload
            }
        }
        default:
            return state;
    }
}

export default combineReducers({
    reducer: reducer,
    form: formReducer
})