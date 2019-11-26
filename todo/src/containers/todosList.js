import React from 'react'
import CreateFormTodo from '../components/todoCreate';
import CardTodo from '../components/cards';
import DetaiTodo from '../components/detailCards'
import {connect} from 'react-redux';
import {isDetail, fetchTodoData, formModalHandler, sortByDue} from '../store/actions';
import {Dropdown, DropdownButton, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class TodosList extends React.Component {
    componentDidMount(){
        if(localStorage.token){
            this.props.fetchTodoData()
        }
    }
    listTodoRender(){
        return this.props.reducer.todos.map((element, index) => {
          return( <div className="col-3" style={{padding:'5px'}}  key={index} >  
          {this.props.reducer.isLoading ?  <Spinner animation="grow" variant="primary" size="md" /> : 
          <CardTodo
          id = {element._id}
          due_date={element.due_date}
          title={element.title}
          status={element.type}
          image={element.image}
          />}
          </div>)
        }) 
      
        
      }
      sortByDueDate = () => {
        this.props.sortByDue()
      }
    render() {
        return(
            <div className="container text-center">
            <div className="row">
              <div className="col" style={{marginTop: '5px'}}>
                  <CreateFormTodo/>
              </div>
            </div>
            <div className= "row">
              <div style={{marginLeft: '15px', marginBottom: '5px'}}>
                  {this.props.reducer.todos.length !== 0 ? 
                  <DropdownButton id="dropdown-basic-button" title="Option">
                        <Dropdown.Item onClick={this.sortByDueDate}>Sort By Due Date</Dropdown.Item>
                  </DropdownButton> : null }
            </div>
            </div>
            <div className="row">
            { this.props.reducer.todos.length !== 0 ? this.listTodoRender(): <div> Please create your data </div> }
            <DetaiTodo/>
            </div>
          </div>
        );
    }
}

const mapStoreToProps = state => {
    return state
}

export default connect(mapStoreToProps, {isDetail, fetchTodoData, formModalHandler, sortByDue})(TodosList)