import React from "react";
import Login from "../components/loginPage";
import Register from "../components/registerPage";
import LoadingPage from "../components/loadingPage";
import { connect } from "react-redux";
import { isLogin, isRegister } from "../store/actions";

class LoginRegister extends React.Component {
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

const mapStoreToProps = state => {
  return state;
};

export default connect(mapStoreToProps, { isLogin, isRegister })(LoginRegister);
