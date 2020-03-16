import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Field, reduxForm, reset } from "redux-form";
import { connect } from "react-redux";
import {
  loginSubmit,
  isRegister,
  isLogin,
  emptyError,
  ggSignIn,
  fetchTodoData
} from "../store/actions";
import { Form, Alert } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import {
  centerPosition,
  loginRegisterFormPositionStyle
} from "./styles/componentsStyle";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";

/**
 * Component Login to show login form
 * return JSX contain spesific login form
 */
class Login extends React.Component {

  /**
   * Instance Method for handling email
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of email
   */
  renderEmail = formprops => {
    return (
      <Form.Group>
        <Form.Label>{label.email}:</Form.Label>
        <Form.Control
          data-cy-email
          {...formprops.input}
          type="text"
          placeholder="enter your email..."
        />
      </Form.Group>
    );
  };

  /**
   * Instance Method for handling title
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of password
   */
  renderPassword = formprops => {
    return (
      <Form.Group>
        <Form.Label>{label.password}:</Form.Label>
        <Form.Control
          {...formprops.input}
          data-cy-password
          type="password"
          placeholder="enter your password..."
        />
      </Form.Group>
    );
  };

  /**
   * Instance Method for Submit
   * formValues?: Object - contain input data from user
   * dispatch?: Function -  to trigger a state change
   */
  onSubmit = (formValues, dispatch) => {
     /**
       * action method to handling login
       * formValues?:Object - contain input data from user
       */
    this.props.loginSubmit(formValues);
    /**
       * reset(<classComponent?: string>) - to triger reset form
     */
    dispatch(reset("loginpage"));
  };

  /**
   * Instance Method for navigate to register page
   */
  toRegister = () => {
    /**
     * action method to clear error message
     */
    this.props.emptyError();
     /**
     * action method to change isLogin status
     * <boolean?: false> - isLogin status
     */
    this.props.isLogin(false);
     /**
     * action method to change isRegister status
     * <boolean?: true> - isRegister status
     */
    this.props.isRegister(true);
  };

   /**
   * Instance Method to handling google Signe In
   * response?: Object - contain user token 
   */
  responseGoogle = response => {
    /**
     * action method to send token Id to backend
     */
    this.props.ggSignIn(response.tokenId);
  };

  render() {
    return (
      <div style={centerPosition}>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 offset-lg-3"
              style={loginRegisterFormPositionStyle}
            >
              {this.props.errorServer !== "" ? (
                <Alert variant="danger">{this.props.errorServer}</Alert>
              ) : (
                undefined
              )}
              <h3 className="text-center">{label.formLogin}</h3>
              <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field
                  id="input-email-loginpage"
                  name="email"
                  component={this.renderEmail}
                />
                <Field name="password" component={this.renderPassword} />
                <div className="text-center">
                  <button data-cy="submitLogin" className="btn btn-primary">
                    {button.login}
                  </button>{" "}
                  <br />
                </div>
              </Form>
              <div className="text-center">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID_PRODUCTION} //TO BE CREATED
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
                <button
                  data-cy-nav-toregister
                  type="button"
                  className="btn btn-link"
                  onClick={this.toRegister}
                >
                  {button.navToRegister}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * reduxForm() function similiar connect spesific to handling Redux Form.
 * {form?: String} - Action Method
 * (Login?: JSX) - FormTodo Component
 */
const formWrapped = reduxForm({ form: "loginpage" })(Login);
/**
 * The connect() function connects a React component to a Redux store.
 * null - there isn't mapStoreToProps then we set null
 * {loginSubmit?: Function,
  isLogin?: Function,
  isRegister?: Function,
  emptyError?: Function,
  ggSignIn?: Function,
  fetchTodoData?: Function} - Action Method
 * (formWraped?: Function) - contain ReduxForm
 */
export default connect(null, {
  loginSubmit,
  isLogin,
  isRegister,
  emptyError,
  ggSignIn,
  fetchTodoData
})(formWrapped);
