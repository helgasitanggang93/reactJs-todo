import React from "react";
import { connect } from "react-redux";
import { createTodo, formModalHandler, isDetail } from "../store/actions";
import FormTodo from "./form";
import { Button } from "react-bootstrap";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";

/**
 * Component CreateFormTodo to create todo
 * return JSX contain form
 */
class CreateFormTodo extends React.Component {
  /**
   * Instance method for show create Form
   */
  handleOpenModal = () => {
    /**
     * action method to open or close modal create form 
     * <boolean?: true> - modal create form status
     */
    this.props.formModalHandler(true);
  };

  /**
   * Instance method to close modal create form
   */
  handleClose = () => {
    /**
     * action method to open or close modal create form 
     * <boolean?: false> - modal create form status
     */
    this.props.formModalHandler(false);
    /**
     * Action method for change detail status
     * <boolean?: false> - status isDetail
     */
    this.props.isDetail(false);
  };

  /**
   * Instance Method for Submit
   * formValues?: Object - contain input data from user
   */
  onSubmit = formValues => {
    /**
       * action method to handling create todo
       * formValues?:Object - contain input data from user
    */
    this.props.createTodo(formValues);
    /**
     call instance method to close modal create form
     */
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
 * {createTodo?: Function,
  formModalHandler?: Function,
  isDetail?: Function} - Action Method
 * (CreateFormTodo?: JSX) - CreateFormTodo Component
 */
export default connect(mapStoreToProps, {
  createTodo,
  formModalHandler,
  isDetail
})(CreateFormTodo);
