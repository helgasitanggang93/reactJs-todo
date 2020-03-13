import axiosTodo from "../apis/api_todo";
import Swal from "sweetalert2";

export const sortByDue = () => (dispatch, getState) => {
  let sorted = getState().reducer.todos.sort((a, b) => {
    let firstDate = new Date(a.due_date).getTime();
    let secondDate = new Date(b.due_date).getTime();

    return firstDate - secondDate;
  });

  dispatch({
    type: "FETCH_TODO_DATA",
    payload: sorted
  });
};

export const sortByDueDesc = () => (dispatch, getState) => {
  let sorted = getState().reducer.todos.sort((a, b) => {
    let firstDate = new Date(a.due_date).getTime();
    let secondDate = new Date(b.due_date).getTime();

    return secondDate - firstDate;
  });

  dispatch({
    type: "FETCH_TODO_DATA",
    payload: sorted
  });
};

export const isDetail = bool => {
  return {
    type: "IS_DETAIL",
    payload: bool
  };
};

export const isGoogleSignIn = bool => {
  return {
    type: "IS_GOOGLE_SIGN_IN",
    payload: bool
  };
};

export const shwoLoading = () => {
  return {
    type: "IS_LOADING"
  };
};

export const isLoginRegister = bool => {
  return {
    type: "IS_LOGIN_REGISTER",
    payload: bool
  };
};

export const isLogin = bool => {
  return {
    type: "IS_LOGIN",
    payload: bool
  };
};

export const isRegister = bool => {
  return {
    type: "IS_REGISTER",
    payload: bool
  };
};

export const formModalHandler = bool => {
  return {
    type: "FORM_MODAL_HANDLER",
    payload: bool
  };
};

export const fetchTodoData = () => dispatch => {
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  axiosTodo
    .get("/todos")
    .then(({ data }) => {
      dispatch({
        type: "IS_LOADING",
        payload: true
      });

      dispatch({
        type: "FETCH_TODO_DATA",
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: "ITEM_ERROR",
        payload: err
      });
    });
};

export const updateDoneTodo = (id, status) => (dispatch, getState) => {
  dispatch({
    type: "IS_LOADING"
  });
  let newArr = getState().reducer.todos.filter(element => {
    return element._id !== id;
  });
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  axiosTodo
    .patch(`/todos/${id}`, {
      type: status
    })
    .then(({ data }) => {
      dispatch({
        type: "FETCH_TODO_DATA",
        payload: [data, ...newArr]
      });

      dispatch({
        type: "FETCH_DETAIL_TODO",
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: "ITEM_ERROR",
        payload: err
      });
    });
};

export const fetchDetailTodo = id => dispatch => {
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  axiosTodo
    .get(`/todos/${id}`)
    .then(({ data }) => {
      dispatch({
        type: "FETCH_DETAIL_TODO",
        payload: data
      });
    })
    .catch(err => {
      dispatch({
        type: "ITEM_ERROR",
        payload: err
      });
    });
};

export const createTodo = values => async dispatch => {
  try {
    const { title, description, due_date, image } = values;
    axiosTodo.defaults.headers.common["token"] = localStorage.token;
    if (!image || image.length === 0) {
      dispatch({ type: "IS_LOADING" });
      await axiosTodo.post(`/todos`, {
        title: title,
        description: description,
        due_date: due_date,
        type: "urgent",
        image:
          "https://res.cloudinary.com/dpnjbs730/image/upload/v1574910240/no_image_yet_fmxurx.jpg"
      });
    } else {
      dispatch({ type: "IS_LOADING" });
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
      type: "FETCH_TODO_DATA",
      payload: allData.data
    });
  } catch (error) {
    dispatch({
      type: "ITEM_ERROR",
      payload: error
    });
  }
};

export const updateTodo = (id, values) => async (dispatch, getState) => {
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  let newArr = getState().reducer.todos.filter(element => {
    return element._id !== id;
  });
  if (typeof values.image === "object") {
    try {
      dispatch({ type: "IS_LOADING" });
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
        type: "FETCH_TODO_DATA",
        payload: [data, ...newArr]
      });
    } catch (error) {
      dispatch({
        type: "ITEM_ERROR",
        payload: error
      });
    }
  } else if (typeof values.image === "string") {
    try {
      dispatch({ type: "IS_LOADING" });
      let { data } = await axiosTodo.patch(`/todos/${id}`, {
        title: values.title,
        description: values.description,
        due_date: values.due_date
      });
      dispatch({
        type: "FETCH_TODO_DATA",
        payload: [data, ...newArr]
      });
    } catch (error) {
      dispatch({
        type: "ITEM_ERROR",
        payload: error
      });
    }
  }
};

export const deleteTodo = id => (dispatch, getState) => {
  dispatch({
    type: "IS_LOADING"
  });
  axiosTodo.defaults.headers.common["token"] = localStorage.token;
  let newArr = getState().reducer.todos.filter(element => element._id !== id);
  axiosTodo
    .delete(`/todos/${id}`)
    .then(() => {
      dispatch({
        type: "FETCH_TODO_DATA",
        payload: newArr
      });
    })
    .catch(err => {
      dispatch({
        type: "ITEM_ERROR",
        payload: err
      });
    });
};

export const loginSubmit = values => dispatch => {
  dispatch({
    type: "IS_LOADING"
  });
  axiosTodo
    .post("/login", {
      email: values.email,
      password: values.password
    })
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
      dispatch({
        type: "IS_LOGIN_REGISTER",
        payload: false
      });
      dispatch({
        type: "ITEM_ERROR",
        payload: ""
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: "ITEM_ERROR",
        payload: response.data.message
      });
    });
};

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
        type: "IS_LOGIN",
        payload: true
      });

      dispatch({
        type: "IS_REGISTER",
        payload: false
      });

      dispatch({
        type: "ITEM_ERROR",
        payload: ""
      });

      Swal.fire("congrats new comer, please login");
    })
    .catch(({ response }) => {
      dispatch({
        type: "ITEM_ERROR",
        payload: response.data
      });
    });
};

export const emptyError = () => dispatch => {
  dispatch({
    type: "ITEM_ERROR",
    payload: ""
  });
};

export const emptydDetail = () => dispatch => {
  dispatch({
    type: "FETCH_DETAIL_TODO",
    payload: {}
  });
};

export const emptyTodos = () => dispatch => {
  dispatch({
    type: "FETCH_TODO_DATA",
    payload: []
  });
};

export const ggSignIn = token => dispatch => {
  dispatch({
    type: "IS_LOADING"
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
        type: "IS_GOOGLE_SIGN_IN",
        payload: true
      });
      dispatch({
        type: "IS_LOGIN_REGISTER",
        payload: false
      });

      dispatch({
        type: "ITEM_ERROR",
        payload: ""
      });
    })
    .catch(error => {
      if (error.response.status === 400) {
        dispatch({
          type: "ITEM_ERROR",
          payload: "please login"
        });
      }
    });
};
