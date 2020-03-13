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
import {centerPosition, loginRegisterFormPositionStyle} from './styles/componentsStyle';

class Register extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }

  renderName = formprops => {
    return (
      <Form.Group>
        <Form.Label>Name:</Form.Label>
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

  renderEmail = formprops => {
    return (
      <Form.Group>
        <Form.Label>Email:</Form.Label>
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

  renderPassword = formprops => {
    return (
      <Form.Group>
        <Form.Label>Password:</Form.Label>
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

  renderRole = formprops => {
    return (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Role</Form.Label>
        <Form.Control data-cy-register-role {...formprops.input} as="select">
          <option>Pick your role</option>
          <option value="se">Software Engineer</option>
          <option value="con">Consultant</option>
          <option value="sq">Software Quality</option>
        </Form.Control>
        {this.renderError(formprops.meta)}
      </Form.Group>
    );
  };

  onSubmit = (formValues, dispatch) => {
    this.props.registerSubmit(formValues);
    dispatch(reset("register"));
  };

  toLogin = () => {
    this.props.emptyError();
    this.props.isLogin(true);
    this.props.isRegister(false);
  };

  render() {
    return (
      <div
        style={centerPosition}
      >
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 offset-lg-3"
              style={loginRegisterFormPositionStyle}
            >
              <h3 className="text-center">Form Register</h3>
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
                  <button className="btn btn-primary">Submit</button>
                </div>
              </Form>
              <button
                data-cy-register-back
                onClick={this.toLogin}
                className="btn btn-primary"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "name must be required";
  }

  if (!formValues.email) {
    errors.email = "email must be required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "email format invalid";
  }

  if (!formValues.password) {
    errors.password = "password must be required";
  } else if (formValues.password.length < 6) {
    errors.password = "minimum length password is 6";
  }

  if (!formValues.role) {
    errors.role = "please pick your role";
  }

  return errors;
};
const formWrapped = reduxForm({ form: "register", validate })(Register);

export default connect(null, {
  registerSubmit,
  isLogin,
  isRegister,
  emptyError
})(formWrapped);
