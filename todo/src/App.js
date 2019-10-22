import React from 'react';
import Navbar from './components/navbar';
import axios from 'axios';
import FormTodo from './components/form';
import CardTodo from './components/cards';
import DetaiTodo from './components/detailCards'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Col, Dropdown} from 'react-bootstrap';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      setShow: false,
      todosData : [],
      detailData: {},
      isDetail: false
    }
  }

  componentDidMount(){
    this.fetchTodo()
  }

  fetchTodo = () =>{
    axios({
      url: 'http://localhost:3000/todos',
      method:'GET'
    })
    .then(({data}) => {
      this.setState({
        todosData: []
      })

      this.setState({
        todosData: data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  handleOpenModal = () => {
    this.setState({setShow: true})
  }
  handleClose= () => {
    this.setState({setShow: false})
  }

  listTodoComponent(){
    if(this.state.todosData.length !== 0){
      return this.state.todosData.map((element, index) =>
                <Col className="m-1" key = {index}>
                  <CardTodo 
                    id = {element.id}
                    title = {element.title}
                    description = {element.description}
                    status = {element.type}
                    due_date = {element.due_date}
                    seeDetail = {this.showDetail}
                    />
                </Col>
      ) 
     
    }
  }

  showDetail = (idFromChild) => {
    axios({
      url: `http://localhost:3000/todos/${idFromChild}`,
      method: 'GET'
    })
    .then(({data})=>{
      this.setState({
        detailData: data,
        isDetail: true
      })
     
    })
    .catch(err=>{
      console.log(err)
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

          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sort
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">reset</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">sort by due date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </Col>           
          </Row>

          <Row>
            {this.listTodoComponent()}
            </Row>
          </Col>

          <Col>
            <DetaiTodo/>
          </Col>

        </Row>
      </Container>
    </div>
  );
  }
}

export default App;
