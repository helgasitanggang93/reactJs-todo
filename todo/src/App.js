import React from 'react';
import Navbar from './components/navbar';
import CreateFormTodo from './components/todoCreate';
import CardTodo from './components/cards';
import 'bootstrap/dist/css/bootstrap.min.css';
import {isDetail, fetchTodoData, formModalHandler, sortByDue} from './store/actions';
import {connect} from 'react-redux';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';

class App extends React.Component {
  componentDidMount(){
    this.props.fetchTodoData()
  }
  
  listTodoRender(){
    return this.props.reducer.todos.map(element => {
      return <Col  key={element.id} > <CardTodo
      id = {element.id}
      due_date={element.due_date}
      title={element.title}
      status={element.type}
      />
      </Col>
    })
  }
  sortByDueDate = () => {
    this.props.sortByDue()
  }
  render(){
  return (
    <div>
      <Navbar/>
      <Container className="text-center">
        <Row>
          <Col>
           <CreateFormTodo/>
          </Col>
        </Row>
      </Container>

      <Container className="text-center pt-5">
        <Row>
          <DropdownButton id="dropdown-basic-button" title="Option">
            <Dropdown.Item onClick={this.sortByDueDate}>Sort By Due Date</Dropdown.Item>
          </DropdownButton>
          </Row>
        <Row>
          {this.listTodoRender()}
        </Row>
      </Container>
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
