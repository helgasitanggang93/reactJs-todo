import React from "react";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import TodoList from "./containers/todosList";
import LoginRegister from "./containers/loginRegister";
import { isLoginRegister, isLogin, fetchTodoData } from "./store/actions";

/**
 * Root Component to contain all containers either LoginRegister or TodoList
 * return JSX contain all containers
 */
class App extends React.Component {
  /**
   * React Life cycle
   * it will run after the EditFormTodo has been rendered
   */
  componentDidMount() {
    /**
     * check condition if localstorage exist
     */
    if (!localStorage.token) {
      /**
     * action method to change isLoginRegister status
     * <boolean?: true> - isLogin status
     */
      this.props.isLoginRegister(true);
      /**
     * action method to change isLogin status
     * <boolean?: true> - isLogin status
     */
      this.props.isLogin(true);
    } else {
      /**
     * action method to change isLoginRegister status
     * <boolean?: false> - isLoginRegister status
     */
      this.props.isLoginRegister(false);
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.reducer.isLoginRegister ? <LoginRegister /> : <TodoList />}
      </div>
    );
  }
}

/**
 * Mapping initialState and parent prop into local props
 * state?: Object - it will be called whenever the store state changes, and given the store state as the only parameter.
 * return - state Object
 */
const mapStoreToProps = state => {
  return state;
};


/**
 * The connect() function connects a React component to a Redux store.
 * mapStoreToProps?: Function - deals with your Redux store’s state and dispatch, respectively.
 * {isLoginRegister?: Function,
  isLogin?: Function,
  fetchTodoData?: Function} - Action Method
 * (App?: JSX) - App Component
 */
export default connect(mapStoreToProps, { isLoginRegister, isLogin, fetchTodoData })(
  App
);
