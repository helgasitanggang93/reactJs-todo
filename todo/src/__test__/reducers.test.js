import reducer from "../store/reducers";

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

describe("Reducer Result Testing", () => {
  it("IS_DETAIL work properly", () => {
    const action = {
      type: "IS_DETAIL",
      payload: true
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      isDetail: action.payload
    });
  });

  it("IS_LOADING work properly", () => {
    const action = {
      type: "IS_LOADING"
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({ ...initialState, isLoading: true });
  });

  it("IS_LOGIN_REGISTER work properly", () => {
    const action = {
      type: "IS_LOGIN_REGISTER",
      payload: true
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      isLoginRegister: action.payload,
      isLoading: false
    });
  });

  it("IS_LOGIN work properly", () => {
    const action = {
      type: "IS_LOGIN",
      payload: true
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      isLogin: action.payload
    });
  });

  it("IS_REGISTER work properly", () => {
    const action = {
      type: "IS_REGISTER",
      payload: true
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      isRegister: action.payload
    });
  });

  it("IS_GOOGLE_SIGN_IN work properly", () => {
    const action = {
      type: "IS_GOOGLE_SIGN_IN",
      payload: true
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      isGoogleSignIn: action.payload
    });
  });

  it("ITEM_ERROR work properly", () => {
    const action = {
      type: "ITEM_ERROR",
      payload: "Network Error"
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      errorMessage: action.payload,
      isLoading: false
    });
  });

  it("FORM_MODAL_HANDLER work properly", () => {
    const action = {
      type: "FORM_MODAL_HANDLER",
      payload: true
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      isForm: action.payload
    });
  });

  it("FETCH_TODO_DATA work properly", () => {
    const action = {
      type: "FETCH_TODO_DATA",
      payload: [
        {
          id: "5ddb49cd2476fb0ca3e8b541",
          title: "todo test",
          description: "todo test with jest",
          due_date: "2019-11-27",
          image:
            "http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8..."
        },
        {
          id: "5ddb49cd2476fb0ca3e8b541",
          title: "todo development",
          description: "todo react",
          due_date: "2019-11-27",
          image:
            "http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8..."
        }
      ]
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      todos: action.payload
    });
  });

  it("FETCH_TODO_DATA work properly", () => {
    const action = {
      type: "FETCH_DETAIL_TODO",
      payload: {
        id: "5ddb49cd2476fb0ca3e8b540",
        title: "image test",
        description: "image test with multer",
        due_date: "2019-11-26",
        image:
          "http://res.cloudinary.com/dpnjbs730/image/upload/v1574652564/ryglzhwl8..."
      }
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({
      ...initialState,
      detail: action.payload
    });
  });

  it("UNKNWON work properly", () => {
    const action = {
      type: "UNKNWON"
    };

    const newState = reducer({}, action);
    expect(newState.reducer).toEqual({ ...initialState });
  });
});
