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

class TodosList extends React.Component {
  componentDidMount() {
    if (localStorage.token) {
      this.props.fetchTodoData();
    }
  }

  componentWillUnmount() {
    this.props.emptyTodos();
  }

  listTodoRender() {
    return this.props.reducer.todos.map((element, index) => {
      return (
        <div className="col-3" style={paddingForList} key={index}>
          {this.props.reducer.isLoading ? (
            <Spinner animation="grow" variant="primary" size="md" />
          ) : (
            <CardTodo
              id={element._id}
              due_date={element.due_date}
              title={element.title}
              status={element.type}
              image={element.image}
            />
          )}
        </div>
      );
    });
  }

  sortByDueDate = () => {
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

const mapStoreToProps = state => {
  return state;
};

export default connect(mapStoreToProps, {
  isDetail,
  fetchTodoData,
  formModalHandler,
  sortByDue,
  emptyTodos
})(TodosList);
