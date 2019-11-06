import React from 'react'; 
import {Button, Card, Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import {isDetail, updateDoneTodo, fetchTodoData, deleteTodo, fetchDetailTodo, emptydDetail} from '../store/actions';
import EditFormTodo from '../components/todoEdit';
import {formatDate} from '../helper/dateFormating';

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
    setDate = () => {
        return formatDate(this.props.reducer.detail.due_date)
    }
    
    emptyDong = () => {
        this.props.emptydDetail()
        this.props.isDetail(false)

    }
    render(){
        const {title, description, due_date, id, type} = this.props.reducer.detail
        return(
            <div>
            <Modal show={this.props.reducer.isDetail} >
            <Card >
                <Modal.Header style={{ backgroundColor: this.collorStatus(), padding: '0px' }}>
                    <Button onClick={this.emptyDong}>X</Button>
                </Modal.Header>
                <Modal.Body>
                <Card.Body>
                    <Card.Title> {title} </Card.Title>
                   <Card.Text> {due_date} </Card.Text> 
                    <Card.Text> {description} </Card.Text>
                </Card.Body>
                <Card.Footer className="m-1">
                    {type === 'done' ? <Button onClick={() => this.changeStatusDone(id, 'urgent')} className="m-1" variant="info">Undone</Button> : <Button onClick={() => this.changeStatusDone(id, 'done')} className="m-1" variant="info">Done</Button>}
                    {type === 'urgent' ? <EditFormTodo idTodo={id}/>: null}
                    <Button onClick={() => this.deleteTodo(id)} className="m-1" variant="danger">Delete</Button>
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
    fetchTodoData:fetchTodoData, 
    deleteTodo: deleteTodo, 
    fetchDetailTodo:fetchDetailTodo, 
    emptydDetail:emptydDetail})(DetailTodo)