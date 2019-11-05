import React from 'react';
import Navbar from './components/navbar';
// import axios from 'axios';
import FormTodo from './components/form';
import CardTodo from './components/cards';
import DetaiTodo from './components/detailCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import {isDetail, fetchTodoData} from './store/actions';
import {connect} from 'react-redux';
//you can do from './action', rename todoActions.js to index.js
import {Button, Container, Row, Col} from 'react-bootstrap';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      setShow: false, 
    }
  }
  componentDidMount(){
    this.props.fetchTodoData()
  }
  handleOpenModal = () => {
    this.setState({setShow: true})
  }
  handleClose= () => {
    this.setState({setShow: false})
  }
  listTodoRender(){
    return this.props.reducer.todos.map(element => {
      return <CardTodo
      key={element.id}
      id = {element.id}
      due_date={element.due_date}
      title={element.title}
      status={element.type}
      />
    })
  }
  render(){
  return (
    <div>
      <Navbar/>

      <Container className="text-center">
        <Row>
          <Col>
            <Button variant="primary" onClick={this.handleOpenModal}>
                    Create To Do
            </Button>
            <FormTodo
              closeModal={this.handleClose}
              show={this.state.setShow}
            />
          </Col>
        </Row>
      </Container>

      <Container className="text-center pt-5">
        <Row>
          <Col>
          {this.listTodoRender()}
          </Col>
          <Col>{
            this.props.reducer.isDetail ? <DetaiTodo/> : <div>please select detail</div>
          }
          </Col>

        </Row>
      </Container>
    </div>
  );
  }
}

const mapStore = state => {
  return state
}

export default connect(mapStore, {isDetail:isDetail, fetchTodoData: fetchTodoData})(App)
