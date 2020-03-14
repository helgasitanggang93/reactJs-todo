import React from "react";
import { connect } from "react-redux";
import {
  updateTodo,
  isDetail,
  formModalHandler,
  fetchDetailTodo
} from "../store/actions";
import FormTodo from "../components/form";
import { Button } from "react-bootstrap";
import {button} from './contentsVariable/buttonsVariable';
import {label} from './contentsVariable/labelsVariable';

class EditFormTodo extends React.Component {
  componentDidMount() {
    this.props.fetchDetailTodo(this.props.idTodo);
  }

  handleOpenModal = () => {
    this.props.formModalHandler(true);
  };

  handleClose = () => {
    this.props.formModalHandler(false);
    this.props.isDetail(false);
  };

  onSubmit = formValues => {
    this.props.updateTodo(this.props.idTodo, formValues);
    this.handleClose();
    this.props.isDetail(false);
  };
  
  render() {
    return (
      <div>
        <Button data-cy-update variant="warning" onClick={this.handleOpenModal}>
          {button.update}
        </Button>
        <FormTodo
          initialValues={this.props.reducer.detail}
          themeOfModal={label.updateTodoTitle}
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
  updateTodo,
  isDetail,
  formModalHandler,
  fetchDetailTodo
})(EditFormTodo);
