import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./store/reducers";

/**
 * Create <Provider/> Root makes the Redux store available to any nested components that have been wrapped in the connect() function.
 * spesific export to ./index.js
 */
export default props => {
  const stores = createStore(
    reducer,
    props.initialState,
    applyMiddleware(thunk)
  );
  return <Provider store={stores}>{props.children}</Provider>;
};
