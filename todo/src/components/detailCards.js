import React from 'react'; 
import {Button, Modal, Spinner} from 'react-bootstrap';
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
    updateComponent = () => {
        if(this.props.reducer.detail){
            if(this.props.reducer.detail.type === 'urgent'){
                return <div className="col">
                <EditFormTodo idTodo={this.props.reducer.detail._id}/>
             </div>
            }
        }
    }
    render(){
        const {title, description, due_date, _id, type, image} = this.props.reducer.detail
        return(
            <div>
            <Modal  size="md" show={this.props.reducer.isDetail} >

                <Modal.Header style={{ backgroundColor: this.collorStatus(), padding: '0px' }}>
                   <h5> Detail Todo</h5>
                </Modal.Header>
                <Modal.Body >
                <div className="card-body">
                    <div className="card-title text-center">
                        <h3>
                        {title}
                        </h3>
                    </div>
                    <div className="text-center">  
                        {image ? <img className="card-img-top" style={{maxWidth: '300px', maxHeight: '200px'}} src={image} alt="gambar"/> : <Spinner animation="border" variant="primary" />}
                    </div>
                   <div className="card-text text-center"> 
                        <div>
                       <span style={{fontSize: 'smaller'}}> Due Date:</span>
                        <p> {this.setDate(due_date)} </p>
                        </div>            
                    </div> 
                    <div className="card-text text-center">
                    <span style={{fontSize: 'smaller'}}>Desciption:</span> 
                    <p>{description}</p>
                    </div>
                </div>
                <div className="card-footer">
                    <div style={{padding: '0px', margin: '0px'}} className="container">
                        <div className="row">
                            <div className="col">
                                {type === 'done' ? 
                                 <Button onClick={() => this.changeStatusDone(_id, 'urgent')}  variant="info">Undone</Button> : 
                                 <Button onClick={() => this.changeStatusDone(_id, 'done')}  variant="info">Done</Button>}
                            </div>
                            {this.updateComponent()}
                            <div className="col">
                                <Button onClick={() => this.deleteTodo(_id)}  variant="danger">Delete</Button>
                            </div>
                            <div  className="col">
                                 <Button type="button"  variant="primary" onClick={this.emptyDong}>Close</Button>
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