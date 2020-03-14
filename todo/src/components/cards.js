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

class CardTodo extends React.Component {
  openModal = () => {
    const { id } = this.props.appProps;
    this.props.fetchDetailTodo(id);
    this.props.isDetail(true);
  };

  render() {
    const { title, status, due_date } = this.props.appProps;
    return (
      <div>
        <Card className="card-todo" style={cardTodoStyle(status)}>
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
              style={buttonDetailsStyle(status)}
            >
              {button.seeDetail}
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

const mapStoreToProps = (state, ownprops) => {
  return {
    appProps: ownprops,
    store: state.reducer
  };
};

export default connect(mapStoreToProps, {
  fetchDetailTodo,
  isDetail
})(CardTodo);
