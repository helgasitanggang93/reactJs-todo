import React from "react";
import { connect } from "react-redux";
import { createTodo, formModalHandler, isDetail } from "../store/actions";
import FormTodo from "../components/form";
import { Button } from "react-bootstrap";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";

class CreateFormTodo extends React.Component {
  handleOpenModal = () => {
    this.props.formModalHandler(true);
  };

  handleClose = () => {
    this.props.formModalHandler(false);
    this.props.isDetail(false);
  };

  onSubmit = formValues => {
    this.props.createTodo(formValues);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Button
          data-cy-click="createTodo"
          variant="primary"
          onClick={this.handleOpenModal}
        >
          {button.createTodo}
        </Button>
        <FormTodo
          themeOfModal={label.createTodoTitle}
          closeModal={this.handleClose}
          onSubmit={this.onSubmit}
          show={this.props.reducer.isForm}
        />
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return state;
};

export default connect(mapStoreToProps, {
  createTodo,
  formModalHandler,
  isDetail
})(CreateFormTodo);
