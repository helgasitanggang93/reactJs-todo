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

class Navbar extends React.Component {
  displayLoginButton = () => {
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

  onLogOutPressed = () => {
    this.props.isLoginRegister(true);
    this.props.isLogin(true);
    this.props.isGoogleSignIn(false);
    localStorage.clear();
  };

  render() {
    return (
      <div>
        {this.props.reducer.isLoginRegister
          ? this.displayLoginButton()
          : this.isLogin()}
      </div>
    );
  }
}

const mapStoreToprops = state => {
  return state;
};

export default connect(mapStoreToprops, {
  isLoginRegister,
  isLogin,
  isGoogleSignIn,
  emptyTodos,
  shwoLoading
})(Navbar);
