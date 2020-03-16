import React from "react";
import CreateFormTodo from "../components/todoCreate";
import CardTodo from "../components/cards";
import DetaiTodo from "../components/detailCards";
import { connect } from "react-redux";
import {
  isDetail,
  fetchTodoData,
  formModalHandler,
  sortByDue,
  emptyTodos
} from "../store/actions";
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  paddingForList,
  marginTopBetweenCreate,
  spacingBetweenSortButton
} from "../components/styles/componentsStyle";
import { label } from "../components/contentsVariable/labelsVariable";

/**
 * Component Container to contain all data of todoList and detail of todoList component
 * return JSX contain all data of todoList and detail of todoList
 */
class TodosList extends React.Component {
  /**
   * React Life cycle
   * it will run after the TodoList has been rendered
   */
  componentDidMount() {
    if (localStorage.token) {
      /**
       * action method to handling fetch all data
       */
      this.props.fetchTodoData();
    }
  }

  /**
   * React Life cycle
   * it will run after the TodoList has been removed from DOM
   */
  componentWillUnmount() {
    /**
     * action method for empty all data todo
     */
    this.props.emptyTodos();
  }

  listTodoRender() {
    return this.props.reducer.todos.map((element) => {
      return (
        <div className="col-3" style={paddingForList} key={element._id}>
          {this.props.reducer.isLoading ? (
            <Spinner animation="grow" variant="primary" size="md" />
          ) : (
            <CardTodo
            item={element} />
          )}
        </div>
      );
    });
  }

  /**
   * Instance method for sort ascending by due date
   */
  sortByDueDate = () => {
    /**
     * action method for handling sort ascending by due date
     */
    this.props.sortByDue();
  };

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col" style={marginTopBetweenCreate}>
            <CreateFormTodo />
          </div>
        </div>
        <div className="row">
          <div style={spacingBetweenSortButton}>
            {this.props.reducer.todos.length !== 0 ? (
              <DropdownButton id="dropdown-basic-button" title="Option">
                <Dropdown.Item onClick={this.sortByDueDate}>
                  {label.sortByDueDate}
                </Dropdown.Item>
              </DropdownButton>
            ) : null}
          </div>
        </div>
        <div className="row">
          {this.props.reducer.todos.length !== 0 ? (
            this.listTodoRender()
          ) : (
            <div>{label.emptyData}</div>
          )}
          <DetaiTodo />
        </div>
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
 * {fetchTodoData?: Function,
  formModalHandler?: Function,
  isDetail?: Function, 
  sortByDue?: Function,
  emptyTodos?: Function} - Action Method
 * (TodosList?: JSX) - TodosList Component
 */
export default connect(mapStoreToProps, {
  isDetail,
  fetchTodoData,
  formModalHandler,
  sortByDue,
  emptyTodos
})(TodosList);
