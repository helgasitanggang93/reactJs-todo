import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { fetchDetailTodo, isDetail } from "../store/actions";
import { formatDate } from "../helper/dateFormating";
import {
  contentTextColor,
  buttonDetailsStyle,
  cardTodoStyle
} from "./styles/componentsStyle";
import {button} from './contentsVariable/buttonsVariable';
import {label} from './contentsVariable/labelsVariable';

/**
 * Component CardTodo to show all todo list
 * return JSX contain todo infromation
 */

class CardTodo extends React.Component {
  /**
   * Instance method for open todo modal
   * call Action method fetchDetailTodo(<todoId>) to fetch each todo Data
   * call Action method isDetail(<boolean: true>) to change isDetail status
   */
  openModal = () => {
      /**
       * destructuring _id from this.props.appProps.item
       */
    const { _id } = this.props.appProps.item;
    /**
     * Action Type for fetch Detail Todo
     * _id?: idTodo - id dodo
     */
    this.props.fetchDetailTodo(_id);
     /**
     * Action method for change detail status
     * <boolean?: true> - status isDetail
     */
    this.props.isDetail(true);
  };

render() {
    const { title, type, due_date } = this.props.appProps.item;
    return (
      <div>
        <Card className="card-todo" style={cardTodoStyle(type)}>
          <Card.Body>
            <Card.Title style={contentTextColor}> {label.title} </Card.Title>
            <Card.Title style={contentTextColor}>{title}</Card.Title>
            <Card.Text style={contentTextColor}> {label.dueDate} </Card.Text>
            <Card.Text style={contentTextColor}>
              {" "}
              {formatDate(due_date)}{" "}
            </Card.Text>
            <Button
              data-cy-seedetail
              onClick={this.openModal}
              style={buttonDetailsStyle(type)}
            >
              {button.seeDetail}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

/**
 * Mapping initialState and parent prop into local props
 * state?: Object - it will be called whenever the store state changes, and given the store state as the only parameter.
 * ownProps?: Object - from parent props
 * return - Object literal contain appProps and store
 */
const mapStoreToProps = (state, ownprops) => {
  return {
    appProps: ownprops,
    store: state.reducer
  };
};

/**
 * The connect() function connects a React component to a Redux store.
 * mappStoreToProps?: Function - deals with your Redux store’s state and dispatch, respectively.
 * {fetchDetailTodo?: Function, isDetail?: Function} - Action Method
 * (CardTodo?: JSX) - cardTodo Component
 */
export default connect(mapStoreToProps, {
  fetchDetailTodo,
  isDetail
})(CardTodo);
