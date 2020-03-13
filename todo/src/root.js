import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./store/reducers";

export default props => {
  const stores = createStore(
    reducer,
    props.initialState,
    applyMiddleware(thunk)
  );
  return <Provider store={stores}>{props.children}</Provider>;
};
