import React from "react";
import { connect } from "react-redux";
import {
  updateTodo,
  isDetail,
  formModalHandler,
  fetchDetailTodo
} from "../store/actions";
import FormTodo from "./form";
import { Button } from "react-bootstrap";
import {button} from './contentsVariable/buttonsVariable';
import {label} from './contentsVariable/labelsVariable';

/**
 * Component EditFormTodo to update todo
 * return JSX contain form
 */
class EditFormTodo extends React.Component {
  /**
   * React Life cycle
   * it will run after the EditFormTodo has been rendered
   */
  componentDidMount() {
    /**
     * action method to handling fetch detail todo
     * this.props.idTodo?: idTodo - id of todo from parent component
     */
    this.props.fetchDetailTodo(this.props.idTodo);
  }

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
     * <boolean?: true> - modal create form status
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
       * action method to handling update todo
       * formValues?:Object - contain input data from user
    */
    this.props.updateTodo(this.props.idTodo, formValues);
    /**
     call instance method to close modal update form
     */
    this.handleClose();
    /**
     * Action method for change detail status
     * <boolean?: false> - status isDetail
     */
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
 * {updateTodo?: Function,
  isDetail?: Function,
  formModalHandler?: Function,
  deleteTodo?: Function,
  fetchDetailTodo?: Function} - Action Method
 * (EditFormTodo?: JSX) - EditFormTodo Component
 */
export default connect(mapStoreToProps, {
  updateTodo,
  isDetail,
  formModalHandler,
  fetchDetailTodo
})(EditFormTodo);
