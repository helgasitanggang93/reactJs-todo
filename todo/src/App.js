import React from 'react';
import Navbar from './components/navbar';
import CreateFormTodo from './components/todoCreate';
import CardTodo from './components/cards';
import DetaiTodo from './components/detailCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import {isDetail, fetchTodoData, formModalHandler, sortByDue} from './store/actions';
import {connect} from 'react-redux';
import {Dropdown, DropdownButton} from 'react-bootstrap';

class App extends React.Component {
  componentDidMount(){
    this.props.fetchTodoData()
  }
  
  listTodoRender(){
    return this.props.reducer.todos.map(element => {
      return <div className="col-3" style={{padding:'5px'}}  key={element.id} > <CardTodo
      id = {element.id}
      due_date={element.due_date}
      title={element.title}
      status={element.type}
      />
      </div>
    })
  }
  sortByDueDate = () => {
    this.props.sortByDue()
  }
  render(){
  return (
    <div>
      <Navbar/>
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
    </div>
  );
  }
}

const mapStore = state => {
  return state
}

export default connect(mapStore, 
  {isDetail:isDetail, 
    fetchTodoData: fetchTodoData, 
    formModalHandler: formModalHandler, 
    sortByDue: sortByDue})(App)
