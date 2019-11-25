import React from 'react'; 
import {Button, Card, Modal, Image} from 'react-bootstrap';
import { connect } from 'react-redux';
import {isDetail, updateDoneTodo, fetchTodoData, deleteTodo, fetchDetailTodo, emptydDetail} from '../store/actions';
import EditFormTodo from '../components/todoEdit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDate } from '../helper/dateFormating';

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
    emptyDong = () => {
        this.props.emptydDetail()
        this.props.isDetail(false)

    }

    setDate = (due_date) => {
        if(due_date) return formatDate(due_date)
    
    }

    render(){
        const {title, description, due_date, _id, type, image} = this.props.reducer.detail
        return(
            <div>
            <Modal  size="md" show={this.props.reducer.isDetail} >
            <Card >
                <Modal.Header style={{ backgroundColor: this.collorStatus(), padding: '0px' }}>
                    <Button onClick={this.emptyDong}>X</Button>
                </Modal.Header>
                <Modal.Body >
                <Card.Body>
                {/* <Card.Img size="sm" variant="top" src={image} /> */}
                    <div className='container' style={{height: '100px', width: '200px', marginBottom: '30px'}}>
                        <div className="row">
                            <div className="col-lg-12">
                                <Image style={{width: 'auto', height: '130px'}} src={image} alt="gambar"  thumbnail/>
                            </div>
                        </div>
                    </div>
                    <Card.Title>
                       Title: {title}
                    </Card.Title>   
                   <Card.Text> 
                      Due Date:{this.setDate(due_date)}
                    </Card.Text> 
                    <Card.Text> 
                      Desciption: {description} 
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {type === 'done' ? 
                                 <Button onClick={() => this.changeStatusDone(_id, 'urgent')} className="m-1" variant="info">Undone</Button> : 
                                 <Button onClick={() => this.changeStatusDone(_id, 'done')} className="m-1" variant="info">Done</Button>}
                            </div>
                            <div className="col">
                                {type === 'urgent' ? <EditFormTodo idTodo={_id}/>: null}
                            </div>
                            <div className="col">
                                <Button onClick={() => this.deleteTodo(_id)} className="m-1" variant="danger">Delete</Button>
                            </div>
                        </div>
                    </div>
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