import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import {
  isDetail,
  updateDoneTodo,
  fetchTodoData,
  deleteTodo,
  fetchDetailTodo,
  emptydDetail
} from "../store/actions";
import EditFormTodo from "./todoEdit";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDate } from "../helper/dateFormating";
import {
  headerDetailCardStyle,
  imageDetailCardStyle,
  contentTextStyle,
  layoutDefaultSetting
} from "./styles/componentsStyle";
import { button } from "./contentsVariable/buttonsVariable";
import { label } from "./contentsVariable/labelsVariable";

/**
 * Component DetailTodo to show each todo list
 * return JSX contain detail todo infromation
 */
class DetailTodo extends React.Component {
    /**
     * Instance method for changes todo Status
     * id?: idTodo - todo id
     * statusDone?: String - contain urgent or unUrgent
     */
  changeStatusDone = (id, statusDone) => {
      /**
       * Action method for update todo status
       * id?: idTodo - todo id
       * statusDone?: String - contain urgent or unUrgent
       */
    this.props.updateDoneTodo(id, statusDone);
  };

  /**
     * Instance method for delete todo
     * id?: idTodo - todo id
     */
  deleteTodo = id => {
       /**
     * Action method for delete todo
     * id?: idTodo - todo id
     */
    this.props.deleteTodo(id);
      /**
     * Action method for change detail status
     * <boolean?: false> - status isDetail
     */
    this.props.isDetail(false);
  };

   /**
     * Instance method for empty detail todo in InitialState when clicking close button
    */
  onEmptyDetail = () => {
      /**
     * Action method to empty detail todo 
     */
    this.props.emptydDetail();
     /**
     * Action method for change detail status
     * <boolean?: false> - status isDetail
     */
    this.props.isDetail(false);
  };

  updateComponent = () => {
    if (this.props.reducer.detail) {
      if (this.props.reducer.detail.type === "urgent") {
        return (
          <div className="col">
            <EditFormTodo
              id="buttonupdate-detail-todo"
              idTodo={this.props.reducer.detail._id}
            />
          </div>
        );
      }
    }
  };

  render() {
    const {
      title,
      description,
      due_date,
      _id,
      type,
      image
    } = this.props.reducer.detail;
    return (
      <div className="detail-todo">
        <Modal
          className="modal-todo-detail"
          size="md"
          show={this.props.reducer.isDetail}
        >
          <Modal.Header style={headerDetailCardStyle(type)}>
            <h5> {label.detailTodo}</h5>
          </Modal.Header>
          <Modal.Body>
            <div className="card-body">
              <div className="card-title text-center">
                <h3 id="title-detail-todo">{title}</h3>
              </div>
              <div id="image-detail-todo" className="text-center">
                {image ? (
                  <img
                    className="card-img-top"
                    style={imageDetailCardStyle}
                    src={image}
                    alt="gambar"
                  />
                ) : (
                  <Spinner animation="border" variant="primary" />
                )}
              </div>
              <div className="card-text text-center">
                <div>
                  <span style={contentTextStyle}> {label.dueDate}:</span>
                  <p id="duedate-detail-todo"> {formatDate(due_date)} </p>
                </div>
              </div>
              <div className="card-text text-center">
                <span style={contentTextStyle}>{label.description}:</span>
                <p id="description-detail-todo">{description}</p>
              </div>
            </div>
            <div className="card-footer">
              <div style={layoutDefaultSetting} className="container">
                <div className="row">
                  <div id="buttondone-detail-todo" className="col">
                    {type === "done" ? (
                      <Button
                        id="buttonundone-detail-todo"
                        data-cy-done
                        onClick={() => this.changeStatusDone(_id, "urgent")}
                        variant="info"
                      >
                        {button.undone}
                      </Button>
                    ) : (
                      <Button
                        data-cy-undone
                        onClick={() => this.changeStatusDone(_id, "done")}
                        variant="info"
                      >
                        {button.done}
                      </Button>
                    )}
                  </div>
                  {this.updateComponent()}
                  <div id="buttondelete-detail-todo" className="col">
                    <Button
                      data-cy-delete
                      onClick={() => this.deleteTodo(_id)}
                      variant="danger"
                    >
                      {button.delete}
                    </Button>
                  </div>
                  <div className="col">
                    <Button
                      id="buttonclose-detail-todo"
                      data-cy-closedetail
                      type="button"
                      variant="primary"
                      onClick={this.onEmptyDetail}
                    >
                      {button.close}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

/**
 * Mapping initialState and parent prop into local props
 * state?: Object - it will be called whenever the store state changes, and given the store state as the only parameter.
 * return - state Object
 */
const mapmapStoreToProps = state => {
  return state;
};

/**
 * The connect() function connects a React component to a Redux store.
 * mapStoreToProps?: Function - deals with your Redux store’s state and dispatch, respectively.
 * {isDetail?: Function,
  updateDoneTodo?: Function,
  fetchTodoData?: Function,
  deleteTodo?: Function,
  fetchDetailTodo?: Function,
  emptydDetail?: Function} - Action Method
 * (DetailTodo?: JSX) - cardTodo Component
 */
export default connect(mapmapStoreToProps, {
  isDetail,
  updateDoneTodo,
  fetchTodoData,
  deleteTodo,
  fetchDetailTodo,
  emptydDetail
})(DetailTodo);
