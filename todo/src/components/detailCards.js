import React from 'react'; 
import {Button, Card, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import {isDetail, updateDoneTodo, fetchTodoData, deleteTodo} from '../store/actions';
import EditFormTodo from '../components/todoEdit';
class DetailTodo extends React.Component {
    componentDidMount(){
        this.collorStatus(); 
    }
    collorStatus = () => {
        if(this.props.reducer.detail.type === 'urgent'){   
            return '#ef5350'
        }else if(this.props.reducer.detail.type === 'noUrgent'){
            return '#ffe67c'
        }else if(this.props.reducer.detail.type === 'done'){
            return '#8aaae5'
        }
    }

    changeStatusDone = (id, statusDone) =>{
        this.props.updateDoneTodo(id, statusDone)
    }

    deleteTodo = (id) => {
        this.props.deleteTodo(id)
        this.props.isDetail(false)
    }
    render(){
        const {detail} = this.props.reducer 
        return(
            <div>
                <Modal show={this.props.reducer.isDetail} onHide={() => this.props.isDetail(false)}>
                <Card >
                    <Modal.Header style={{ backgroundColor: this.collorStatus(), padding: '0px' }} closeButton>
                        Detail Todo
                    </Modal.Header>
                    <Modal.Body>
                    <Card.Body>
                        <Card.Title> {detail.title} </Card.Title>
                        <Card.Text> {detail.due_date} </Card.Text>
                        <Card.Text> {detail.description} </Card.Text>
                    </Card.Body>
                    <Card.Footer className="m-1">
                        {detail.type === 'done' ? <Button onClick={() => this.changeStatusDone(detail.id, 'urgent')} className="m-1" variant="info">Undone</Button> : <Button onClick={() => this.changeStatusDone(detail.id, 'done')} className="m-1" variant="info">Done</Button>}
                        {detail.type === 'urgent' ? <EditFormTodo idTodo={detail.id}/>: null}
                        <Button onClick={() => this.deleteTodo(detail.id)} className="m-1" variant="danger">Delete</Button>
                    </Card.Footer>
                    </Modal.Body>
                </Card>
                
                </Modal>
            </div>
        );
    }
}

const mampToStore = (state) => {
    return state
}

export default connect(mampToStore, 
    {isDetail: isDetail, 
    updateDoneTodo: updateDoneTodo, 
    fetchTodoData:fetchTodoData, deleteTodo: deleteTodo})(DetailTodo)