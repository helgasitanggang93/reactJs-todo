import React from "react";
import { connect } from "react-redux";
import {
  isLoginRegister,
  isLogin,
  isGoogleSignIn,
  emptyTodos,
  shwoLoading
} from "../store/actions";
import { GoogleLogout } from "react-google-login";
import "bootstrap/dist/css/bootstrap.min.css";
import { textNavColor, navBaseColor } from "./styles/componentsStyle";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";

/**
 * Component Navbar to show Navbar
 * return JSX contain Navbar
 */
class Navbar extends React.Component {
     /**
     * Instance method to show content if not login
     * return Label React To DO
     */
  displayHeaderTitle = () => {
    return (
      <nav
        id="navbar-nologin"
        className="navbar navbar-expand-lg navbar-light"
        style={navBaseColor}
      >
        <h3 className="navbar-brand" style={textNavColor}>
          {label.reactTodo}
        </h3>
      </nav>
    );
  };

  /**
     * Instance method to show Log Out button
     * return Log Out Button using google Sign out or not
     */
  isLogin = () => {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light justify-content-between"
        style={navBaseColor}
      >
        <h3 className="navbar-brand" style={textNavColor}>
          {label.reactTodo}
        </h3>
        {this.props.reducer.isGoogleSignIn ? (
          this.logOutGoogle()
        ) : (
          <button
            data-cy="logOutNoGsignIn"
            onClick={this.onLogOutPressed}
            className="btn btn-secondary"
          >
            {button.logOut}
          </button>
        )}
      </nav>
    );
  };

  /**
     * Instance method to show Log Out button using Google Sign out
     * return Log Out Button using google Log out or not
     */
  logOutGoogle = () => {
    return (
      <GoogleLogout
        render={renderProps => (
          <button className="btn btn-secondary" onClick={renderProps.onClick}>
            {button.logOut}
          </button>
        )}
        onLogoutSuccess={this.onLogOutPressed}
      />
    );
  };

  /**
   * Instance Method for Log out
   */
  onLogOutPressed = () => {
      /**
       * action method to change isLoginRegister status
       * <boolean?: true> - isLoginRegister Status
       */
    this.props.isLoginRegister(true);
     /**
       * action method to change isLogin status
       * <boolean?: true> - isLogin Status
       */
    this.props.isLogin(true);
      /**
       * action method to change isGoogleSignIn status
       * <boolean?: false> - isGoogleSignIn Status
       */
    this.props.isGoogleSignIn(false);
    /**
     * method for clearing token from localStorage
     */
    localStorage.clear();
  };

  render() {
    return (
      <div>
        {this.props.reducer.isLoginRegister
          ? this.displayHeaderTitle()
          : this.isLogin()}
      </div>
    );
  }
}

/**
 * Mapping initialState and parent prop into local props
 * state?: Object - it will be called whenever the store state changes, and given the store state as the only parameter.
 * return - state Object
 */
const mapStoreToprops = state => {
  return state;
};

/**
 * The connect() function connects a React component to a Redux store.
 * mapStoreToProps?: Function - deals with your Redux store’s state and dispatch, respectively.
 * {isLoginRegister?: Function,
  isLogin?: Function,
  isGoogleSignIn?: Function,
  emptyTodos?: Function,
  shwoLoading?: Function,
 * (Navbar?: JSX) - Navbar Component
 */
export default connect(mapStoreToprops, {
  isLoginRegister,
  isLogin,
  isGoogleSignIn,
  emptyTodos,
  shwoLoading
})(Navbar);
