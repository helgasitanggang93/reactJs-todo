import React from "react";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import { Field, reduxForm, reset } from "redux-form";

class FormTodo extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return <Alert variant="danger">{error}</Alert>;
    }
  }

  lengthValue = (limit, lengthValue = 0) => {
    return (limit -= lengthValue);
  };

  renderInput = formProps => {
    return (
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          id="data-cy-title-update"
          data-cy-title
          {...formProps.input}
          type="text"
          maxLength="40"
          placeholder="Enter title"
        />
        <Form.Text className="text-muted">
          Maximum length of title:{" "}
          {this.lengthValue(40, formProps.input.value.length)}
        </Form.Text>
        {this.renderError(formProps.meta)}
      </Form.Group>
    );
  };

  renderTextArea = formProps => {
    return (
      <Form.Group>
        <Form.Label>Description</Form.Label>
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
          Maximum length of description:{" "}
          {this.lengthValue(200, formProps.input.value.length)}
        </Form.Text>
        {this.renderError(formProps.meta)}
      </Form.Group>
    );
  };

  renderDate = formProps => {
    return (
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
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

  renderImage = formProps => {
    return (
      <Form.Group>
        <Form.Label>Image</Form.Label>
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

  onSubmit = (formValues, dispatch) => {
    this.props.onSubmit(formValues);
    this.props.closeModal();
    dispatch(reset("formTodo"));
  };

  clearCloseModal = () => {
    this.props.dispatch(reset("formTodo"));
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Header>
            <Modal.Title>{this.props.themeOfModal}</Modal.Title>
            <Button onClick={this.clearCloseModal}>X</Button>
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
                  Save Changes
                </button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  } else if (formValues.title.length > 40) {
    errors.title = "Must be 40 Characters or less";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  } else if (formValues.description.length > 200) {
    errors.description = "Must be 20 Characters or less";
  }

  if (!formValues.due_date) {
    errors.due_date = "You must enter a due date";
  } else if (formValues.due_date) {
    var inputdate = new Date(formValues.due_date).getTime();
    let getYear = new Date().getFullYear();
    let getMonth = new Date().getMonth() + 1;
    let getDay = new Date().getDate();
    var stringDay = `${getYear}-${getMonth}-${getDay}`;
    var beforedate = new Date(stringDay).getTime();
    if (inputdate <= beforedate) {
      errors.due_date = "Date Must be Greather";
    }
  }

  if (typeof formValues.image === "object") {
    if (formValues.image[0]) {
      if (formValues.image[0].size > 5242880) {
        errors.image = "maximum file size is 5 MB";
      } else if (
        formValues.image[0].type !== "image/png" &&
        formValues.image[0].type !== "image/jpg" &&
        formValues.image[0].type !== "image/jpeg"
      ) {
        errors.image = "should upload jpg, png or jpeg";
      }
    }
  }

  return errors;
};

export default reduxForm({
  form: "formTodo",
  validate: validate
})(FormTodo);
