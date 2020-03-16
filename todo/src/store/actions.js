import axiosTodo from "../apis/apiTodo";
import Swal from "sweetalert2";
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

/**
 * action method for sort ascending by due date
 * dispatch?: Function -  to trigger a state change
 * getState?: Function - to get existing initialState
 */
export const sortByDue = () => (dispatch, getState) => {
  let sorted = getState().reducer.todos.sort((a, b) => {
    let firstDate = new Date(a.due_date).getTime();
    let secondDate = new Date(b.due_date).getTime();

    return firstDate - secondDate;
  });

  dispatch({
    type: FETCH_TODO_DATA,
    payload: sorted
  });
};

/**
 * action method for sort descending by due date
 * dispatch?: Function -  to trigger a state change
 * getState?: Function - to get existing initialState
 */
export const sortByDueDesc = () => (dispatch, getState) => {
  let sorted = getState().reducer.todos.sort((a, b) => {
    let firstDate = new Date(a.due_date).getTime();
    let secondDate = new Date(b.due_date).getTime();

    return secondDate - firstDate;
  });

  dispatch({
    type: FETCH_TODO_DATA,
    payload: sorted
  });
};

/**
     * Action method for change detail status
     * bool?: boolean - status isDetail
*/
export const isDetail = bool => {
  return {
    type: IS_DETAIL,
    payload: bool
  };
};

/**
     * Action method for change isGoogleSignIn status
     * bool?: boolean - status isDetail
*/
export const isGoogleSignIn = bool => {
  return {
    type: IS_GOOGLE_SIGN_IN,
    payload: bool
  };
};

/**
     * Action method for change showLoading status
*/
export const shwoLoading = () => {
  return {
    type: IS_LOADING
  };
};

/**
     * Action method for change isLoginRegister status
     * bool?: boolean - status isLoginRegister
*/
export const isLoginRegister = bool => {
  return {
    type: IS_LOGIN_REGISTER,
    payload: bool
  };
};

/**
     * Action method for change isLogin status
     * bool?: boolean - status isLogin
*/
export const isLogin = bool => {
  return {
    type: IS_LOGIN,
    payload: bool
  };
};

/**
     * Action method for change isRegister status
     * bool?: boolean - status isRegister
*/
export const isRegister = bool => {
  return {
    type: IS_REGISTER,
    payload: bool
  };
};

/**
     * Action method for change formHandler status
     * bool?: boolean - status formHandler
*/
export const formModalHandler = bool => {
  return {
    type: FORM_MODAL_HANDLER,
    payload: bool
  };
};

/**
     * Action method for handling fetch all todo data
     * dispatch?: Function -  to trigger a state change
*/
export const fetchTodoData = () => dispatch => {
    /**
     * send token into backend to provide authentication and authorization
     */
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  axiosTodo
    .get("/todos")
    .then(({ data }) => {
      dispatch({
        type: IS_LOADING,
        payload: true
      });

      dispatch({
        type: FETCH_TODO_DATA,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ITEM_ERROR,
        payload: err
      });
    });
};

/**
     * Action method for handling changes of todo status
     * id?: idTodo - id todo
     * status?: string - it can be urgent or unUrgent
     * dispatch?: Function -  to trigger a state change
     * getState?: Function - to get existing initialState
*/
export const updateDoneTodo = (id, status) => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING
  });
  /**
   * filtering to not showing selected todo from existing initialState
   */
  let newArr = getState().reducer.todos.filter(element => {
    return element._id !== id;
  });
  /**
     * send token into backend to provide authentication and authorization
     */
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  axiosTodo
    .patch(`/todos/${id}`, {
      type: status
    })
    .then(({ data }) => {
      dispatch({
        type: FETCH_TODO_DATA,
        payload: [data, ...newArr]
      });

      dispatch({
        type: FETCH_DETAIL_TODO,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ITEM_ERROR,
        payload: err
      });
    });
};

/**
     * Action method for fetch todo by id
     * id?: idTodo - id todo
     * dispatch?: Function -  to trigger a state change
*/
export const fetchDetailTodo = id => dispatch => {
    /**
     * send token into backend to provide authentication and authorization
     */
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  axiosTodo
    .get(`/todos/${id}`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_DETAIL_TODO,
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: ITEM_ERROR,
        payload: err
      });
    });
};

/**
     * Action method for create data todo
     * values?: Object - object from user input
     * dispatch?: Function -  to trigger a state change
*/
export const createTodo = values => async dispatch => {
  try {
      /**
       * destructuring of all values
       */
    const { title, description, due_date, image } = values;
    /**
     * send token into backend to provide authentication and authorization
     */
    axiosTodo.defaults.headers.common["token"] = localStorage.token;
    /**
     * check if user doesn't upload an image
     * if the image is false or undefine
     */
    if (!image || image.length === 0) {
      dispatch({ type: IS_LOADING });
      await axiosTodo.post(`/todos`, {
        title: title,
        description: description,
        due_date: due_date,
        type: "urgent",
        image:
          "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
      });
      /**
       * check if user upload an image
       * the image data type must be an array
       */
    } else {
      dispatch({ type: IS_LOADING });
      let formdata = new FormData();
      formdata.append("image", image[0]);
      let imageLink = await axiosTodo.post("/upload", formdata);
      await axiosTodo.post(`/todos`, {
        title: title,
        description: description,
        due_date: due_date,
        type: "urgent",
        image: imageLink.data.link
      });
    }

    let allData = await axiosTodo.get("/todos");
    dispatch({
      type: FETCH_TODO_DATA,
      payload: allData.data
    });
  } catch (error) {
    dispatch({
      type: ITEM_ERROR,
      payload: error
    });
  }
};

/**
     * Action method for update data todo
     * id:? id todo
     * values?: Object - object from user input
     * dispatch?: Function -  to trigger a state change
     * getState?: Function - to get existing initialState
*/
export const updateTodo = (id, values) => async (dispatch, getState) => {
    /**
     * send token into backend to provide authentication and authorization
     */
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  /**
   * filtering to not showing selected todo from existing initialState
   */
  let newArr = getState().reducer.todos.filter(element => {
    return element._id !== id;
  });
  /**
       * check if user change the image
       * the image data type must be an array
       */
  if (typeof values.image === "object") {
    try {
      dispatch({ type: IS_LOADING });
      let formdata = new FormData();
      formdata.append("image", values.image[0]);
      let imageLink = await axiosTodo.post("/upload", formdata);
      let { data } = await axiosTodo.patch(`/todos/${id}`, {
        title: values.title,
        description: values.description,
        due_date: values.due_date,
        image: imageLink.data.link
      });
      dispatch({
        type: FETCH_TODO_DATA,
        payload: [data, ...newArr]
      });
    } catch (error) {
      dispatch({
        type: ITEM_ERROR,
        payload: error
      });
    }
    /**
       * check if user not change the image
       * the image data type must be a string
       */
  } else if (typeof values.image === "string") {
    try {
      dispatch({ type: IS_LOADING });
      let { data } = await axiosTodo.patch(`/todos/${id}`, {
        title: values.title,
        description: values.description,
        due_date: values.due_date
      });
      dispatch({
        type: FETCH_TODO_DATA,
        payload: [data, ...newArr]
      });
    } catch (error) {
      dispatch({
        type: ITEM_ERROR,
        payload: error
      });
    }
  }
};

/**
     * Action method for delete data todo
     * id:? id todo
     * values?: Object - object from user input
     * dispatch?: Function -  to trigger a state change
     * getState?: Function - to get existing initialState
*/
export const deleteTodo = id => (dispatch, getState) => {
  dispatch({
    type: IS_LOADING
  });
   /**
     * send token into backend to provide authentication and authorization
     */
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  /**
   * filtering to not showing selected todo from existing initialState
   */
  let newArr = getState().reducer.todos.filter(element => element._id !== id);
  axiosTodo
    .delete(`/todos/${id}`)
    .then(() => {
      dispatch({
        type: FETCH_TODO_DATA,
        payload: newArr
      });
    })
    .catch(err => {
      dispatch({
        type: ITEM_ERROR,
        payload: err
      });
    });
};

/**
     * Action method for delete data todo
     * values?: Object - object from user input
     * dispatch?: Function -  to trigger a state change
*/
export const loginSubmit = values => dispatch => {
  dispatch({
    type: IS_LOADING
  });
  axiosTodo
    .post("/login", {
      email: values.email,
      password: values.password
    })
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
      dispatch({
        type: IS_LOGIN_REGISTER,
        payload: false
      });
      dispatch({
        type: ITEM_ERROR,
        payload: ""
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: ITEM_ERROR,
        payload: response.data.message
      });
    });
};

/**
     * Action method for delete data todo
     * values?: Object - object from user input
     * dispatch?: Function -  to trigger a state change
*/
export const registerSubmit = values => dispatch => {
  axiosTodo
    .post("/signup", {
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role
    })
    .then(() => {
      dispatch({
        type: IS_LOGIN,
        payload: true
      });

      dispatch({
        type: IS_REGISTER,
        payload: false
      });

      dispatch({
        type: ITEM_ERROR,
        payload: ""
      });

      Swal.fire("congrats new comer, please login");
    })
    .catch(({ response }) => {
      dispatch({
        type: ITEM_ERROR,
        payload: response.data
      });
    });
};

/**
     * Action method for re empty the error message
     * dispatch?: Function -  to trigger a state change
*/
export const emptyError = () => dispatch => {
  dispatch({
    type: ITEM_ERROR,
    payload: ""
  });
};

/**
     * Action method for re empty detail todo
     * dispatch?: Function -  to trigger a state change
*/
export const emptydDetail = () => dispatch => {
  dispatch({
    type: FETCH_DETAIL_TODO,
    payload: {}
  });
};

/**
     * Action method for re empty all todo
     * dispatch?: Function -  to trigger a state change
*/
export const emptyTodos = () => dispatch => {
  dispatch({
    type: FETCH_TODO_DATA,
    payload: []
  });
};

/**
     * Action method for google sign in handling
     * token?: googleUsERid - google user id from google
     * dispatch?: Function -  to trigger a state change
*/
export const ggSignIn = token => dispatch => {
  dispatch({
    type: IS_LOADING
  });
  axiosTodo({
    url: "/gsignin",
    method: "POST",
    headers: {
      token: token
    }
  })
    .then(({ data }) => {
      let token = data.token;
      localStorage.setItem("token", token);
      dispatch({
        type: IS_GOOGLE_SIGN_IN,
        payload: true
      });
      dispatch({
        type: IS_LOGIN_REGISTER,
        payload: false
      });

      dispatch({
        type: ITEM_ERROR,
        payload: ""
      });
    })
    .catch(error => {
      if (error.response.status === 400) {
        dispatch({
          type: ITEM_ERROR,
          payload: "please login"
        });
      }
    });
};
