import React from "react";
import Login from "../components/loginPage";
import Register from "../components/registerPage";
import LoadingPage from "../components/loadingPage";
import { connect } from "react-redux";
import { isLogin, isRegister } from "../store/actions";

/**
 * Component Container to contain login component and register component
 * return JSX contain Login and register component
 */
class LoginRegister extends React.Component {

  /**
   * Instance method for show Loading component
   */
  loadingON = () => {
    return <LoadingPage />;
  };
  
  render() {
    return (
      <div>
        {this.props.reducer.isLoading ? this.loadingON() : null}
        {this.props.reducer.isLogin ? (
          <Login
            className="loginpage"
            errorServer={this.props.reducer.errorMessage}
          />
        ) : null}
        {this.props.reducer.isRegister ? (
          <Register errorServer={this.props.reducer.errorMessage} />
        ) : null}
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
 * {isLogin?: Function,
  isRegister?: Function} - Action Method
 * (LoginRegister?: JSX) - LoginRegister Component
 */
export default connect(mapStoreToProps, { isLogin, isRegister })(LoginRegister);
