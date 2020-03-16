import React from "react";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import { Field, reduxForm, reset } from "redux-form";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";
import { errMessage } from "./contentsVariable/errorsMessage";

/**
 * Component FormTodo to create and update todo data
 * return JSX contain form
 */
class FormTodo extends React.Component {
    /**
     * Instance method for show error
     * {error?: Object, touched?: Object} - static properties from Redux Form
     * return Alert element contain error message
     */
  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }

  /**
   * Instance Method for watch Number length of description or title
   * limit?: number - limit for length of description or title
   * langthValue?: - length of string from user input
   * return - number - calculation from limit min lengthValue
   */
  lengthValue = (limit, lengthValue = 0) => {
    return (limit -= lengthValue);
  };

  /**
   * Instance Method for handling title
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, length, error message of title
   */
  renderInput = formProps => {
    return (
      <Form.Group>
        <Form.Label>{label.title}</Form.Label>
        <Form.Control
          id="data-cy-title-update"
          data-cy-title
          {...formProps.input}
          type="text"
          maxLength="40"
          placeholder="Enter title"
        />
        <Form.Text className="text-muted">
          {label.maxLengthOfTitle}{" "}
          {this.lengthValue(
            label.numLengthOfTitle,
            formProps.input.value.length
          )}
        </Form.Text>
        {this.renderError(formProps.meta)}
      </Form.Group>
    );
  };

  /**
   * Instance Method for handling description
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, length, error message of description
   */
  renderTextArea = formProps => {
    return (
      <Form.Group>
        <Form.Label>{label.description}</Form.Label>
        <Form.Control
          id="data-cy-description-update"
          data-cy-description
          {...formProps.input}
          as="textarea"
          rows="3"
          maxLength="200"
          placeholder="Enter description"
        />
        <Form.Text className="text-muted">
          {label.maxLengthOfDesc}{" "}
          {this.lengthValue(
            label.numLengthOfDesc,
            formProps.input.value.length
          )}
        </Form.Text>
        {this.renderError(formProps.meta)}
      </Form.Group>
    );
  };

  /**
   * Instance Method for handling due date
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of due date
   */
  renderDate = formProps => {
    return (
      <Form.Group>
        <Form.Label>{label.dueDate}</Form.Label>
        <Form.Control
          id="data-cy-date-update"
          data-cy-date
          {...formProps.input}
          type="date"
        />
        {this.renderError(formProps.meta)}
      </Form.Group>
    );
  };

  /**
   * Instance Method for handling Image
   * formProps?: Object - static properties from redux form
   * return - JSX - label, field, error message of image
   */
  renderImage = formProps => {
    return (
      <Form.Group>
        <Form.Label>{label.image}</Form.Label>
        <input
          id="data-cy-image-update"
          data-cy-image
          {...formProps.input}
          value={undefined}
          type="file"
        />
        {this.renderError(formProps.meta)}
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
       * method from parent, it can be create or update
       * formValues?: Object - contain input data from user
       */
    this.props.onSubmit(formValues);
     /**
       * method from parent, to close modal
       */
    this.props.closeModal();
     /**
       * reset(<classComponent?: string>) - to triger reset form
       */
    dispatch(reset("formTodo"));
  };

   /**
     * Instance method for empty detail todo in InitialState when clicking close button
    */
  clearCloseModal = () => {
       /**
       * reset(<classComponent?: string>) - to triger reset form
       */
    this.props.dispatch(reset("formTodo"));
     /**
       * method from parent, to close modal
       */
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>{this.props.themeOfModal}</Modal.Title>
            <Button onClick={this.clearCloseModal}>{label.closeSign}</Button>
          </Modal.Header>
          <Modal.Body>
            <Form
              id="data-cy-submit-form"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              encType="multipart/form-data"
            >
              <Field name="title" component={this.renderInput} />
              <Field name="description" component={this.renderTextArea} />
              <Field name="due_date" component={this.renderDate} />
              <Field name="image" component={this.renderImage} />
              <Modal.Footer>
                <button
                  id="data-cy-submit-update"
                  data-cy-create="submitData"
                  className="btn btn-primary"
                >
                  {button.saveChanges}
                </button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
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
   * block for handling title validation
   */
  if (!formValues.title) {
    errors.title = errMessage.title.emptyTitle;
  } else if (formValues.title.length > 40) {
    errors.title = errMessage.title.titleMoreThanLength;
  }

  /**
   * block for handling description validation
   */
  if (!formValues.description) {
    errors.description = errMessage.description.emptyDescription;
  } else if (formValues.description.length > 200) {
    errors.description = errMessage.description.descMoreThanLength;
  }

  /**
   * block for handling due date validation
   */
  if (!formValues.due_date) {
    errors.due_date = errMessage.dueDate.emptyDueDate;
  } else if (formValues.due_date) {
    var inputdate = new Date(formValues.due_date).getTime();
    let getYear = new Date().getFullYear();
    let getMonth = new Date().getMonth() + 1;
    let getDay = new Date().getDate();
    var stringDay = `${getYear}-${getMonth}-${getDay}`;
    var beforedate = new Date(stringDay).getTime();
    if (inputdate <= beforedate) {
      errors.due_date = errMessage.dueDate.dueLessThanNow;
    }
  }

  /**
   * block for handling image validation
   */
  if (typeof formValues.image === "object") {
    if (formValues.image[0]) {
      if (formValues.image[0].size > 5242880) {
        errors.image = errMessage.image.sizeMoreThan;
      } else if (
        formValues.image[0].type !== "image/png" &&
        formValues.image[0].type !== "image/jpg" &&
        formValues.image[0].type !== "image/jpeg"
      ) {
        errors.image = errMessage.image.anotherImage;
      }
    }
  }

  return errors;
};

/**
 * reduxForm() function similiar connect spesific to handling Redux Form.
 * {form?: String, validate?: Function} - Action Method
 * (FormTodo?: JSX) - FormTodo Component
 */
export default reduxForm({
  form: "formTodo",
  validate: validate
})(FormTodo);
