import React from 'react'; 
import {Button, Card} from 'react-bootstrap';
import { connect } from 'react-redux';
import {isDetail, updateDoneTodo, fetchTodoData} from '../store/actions'
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

    updateTodo = (text) => {
        console.log(text)
    }
    render(){
        const {detail} = this.props.reducer 
        return(
            <div>
                <Card >
                    <Card.Header style={{ backgroundColor: this.collorStatus(), padding: '0px' }}>
                        <div >
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}><Button onClick={() => this.props.isDetail(false)}>X</Button></div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title >{detail.title}</Card.Title>
                        <Card.Text>
                            {detail.due_date}
                        </Card.Text>
                        <Card.Text>
                            {detail.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="m-1">
                        {detail.type === 'done' ? <Button onClick={() => this.changeStatusDone(detail.id, 'urgent')} className="m-1" variant="info">Undone</Button> : <Button onClick={() => this.changeStatusDone(detail.id, 'done')} className="m-1" variant="info">Done</Button>}
                        {detail.type === 'urgent' ? <Button onClick={() => this.updateTodo('trigered UPDATE todo')} className="m-1" variant="warning">Update</Button> : null}
                        <Button className="m-1" variant="danger">Delete</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

const mampToStore = (state) => {
    return state
}

export default connect(mampToStore, {isDetail: isDetail, updateDoneTodo: updateDoneTodo, fetchTodoData: fetchTodoData})(DetailTodo)