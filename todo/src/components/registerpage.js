import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import {
  registerSubmit,
  isLogin,
  isRegister,
  emptyError
} from "../store/actions";
import { Field, reduxForm, reset } from "redux-form";
import {
  centerPosition,
  loginRegisterFormPositionStyle
} from "./styles/componentsStyle";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";
import { errMessage } from "./contentsVariable/errorsMessage";

/**
 * Component Register to show register form
 * return JSX contain spesific register form
 */
class Register extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }

/**
   * Instance Method for handling name
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of name
   */
  renderName = formprops => {
    return (
      <Form.Group>
        <Form.Label>{label.name}:</Form.Label>
        <Form.Control
          data-cy-register-name
          {...formprops.input}
          type="text"
          placeholder="enter your name..."
        />
        {this.renderError(formprops.meta)}
      </Form.Group>
    );
  };

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
          data-cy-register-email
          {...formprops.input}
          type="text"
          placeholder="enter your email..."
        />
        {this.renderError(formprops.meta)}
      </Form.Group>
    );
  };

/**
   * Instance Method for handling password
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of password
   */
  renderPassword = formprops => {
    return (
      <Form.Group>
        <Form.Label>{label.password}:</Form.Label>
        <Form.Control
          data-cy-register-password
          {...formprops.input}
          type="password"
          placeholder="enter your password..."
        />
        {this.renderError(formprops.meta)}
      </Form.Group>
    );
  };

/**
   * Instance Method for handling role
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of role
   */
  renderRole = formprops => {
    return (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>{label.role}:</Form.Label>
        <Form.Control data-cy-register-role {...formprops.input} as="select">
          <option>{label.optionRole}</option>
          <option value="se">{label.roleList.se}</option>
          <option value="con">{label.roleList.con}</option>
          <option value="sq">{label.roleList.sq}</option>
        </Form.Control>
        {this.renderError(formprops.meta)}
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
       * action method to handling register
       * formValues?:Object - contain input data from user
       */
    this.props.registerSubmit(formValues);
    /**
       * reset(<classComponent?: string>) - to triger reset form
     */
    dispatch(reset("register"));
  };

  /**
   * Instance Method for navigate to login page
   */
  toLogin = () => {
    /**
     * action method to clear error message
     */
    this.props.emptyError();
    /**
     * action method to change isLogin status
     * <boolean?: true> - isLogin status
     */
    this.props.isLogin(true);
    /**
     * action method to change isRegister status
     * <boolean?: false> - isRegister status
     */
    this.props.isRegister(false);
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
              <h3 className="text-center">{label.formRegister}</h3>
              {this.props.errorServer !== "" ? (
                <Alert variant="danger">{this.props.errorServer}</Alert>
              ) : (
                undefined
              )}
              <Form
                data-cy-register="submit"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field name="name" component={this.renderName} />
                <Field name="email" component={this.renderEmail} />
                <Field name="password" component={this.renderPassword} />
                <Field name="role" component={this.renderRole} />
                <div className="text-center">
                  <button className="btn btn-primary">{button.submit}</button>
                </div>
              </Form>
              <button
                data-cy-register-back
                onClick={this.toLogin}
                className="btn btn-primary"
              >
                {button.back}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Method for handling form error
 * formValues?: Object - contain meta from static properties of Redux Form
 * return error message
 */
const validate = formValues => {
  /**
     * Object literal to handle form error
     */
  const errors = {};
  /**
   * block for handling name validation
   */
  if (!formValues.name) {
    errors.name = errMessage.name.emptyName;
  }

  /**
   * block for handling email validation
   */
  if (!formValues.email) {
    errors.email = errMessage.email.emptyEmail;
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = errMessage.email.inavalidEmail;
  }

  /**
   * block for handling password validation
   */
  if (!formValues.password) {
    errors.password = errMessage.password.emptyPassword;
  } else if (formValues.password.length < 6) {
    errors.password = errMessage.password.passMoreThanLength;
  }

  /**
   * block for handling role validation
   */
  if (!formValues.role) {
    errors.role = errMessage.role.roleEmpty;
  }

  return errors;
};

/**
 * reduxForm() function similiar connect spesific to handling Redux Form.
 * {form?: String} - Action Method
 * (Login?: JSX) - FormTodo Component
 */
const formWrapped = reduxForm({ form: "register", validate })(Register);
/**
 * The connect() function connects a React component to a Redux store.
 * null - there isn't mapStoreToProps then we set null
 * {registerSubmit?: Function,
  isLogin?: Function,
  isRegister?: Function,
  emptyError?: Function} - Action Method
 * (formWraped?: Function) - contain ReduxForm
 */
export default connect(null, {
  registerSubmit,
  isLogin,
  isRegister,
  emptyError
})(formWrapped);
