import React from 'react';
import {connect} from 'react-redux';
import {Card, Button} from 'react-bootstrap';
import {fetchDetailTodo, isDetail} from '../store/actions';
import {formatDate} from '../helper/dateFormating'

class CardTodo extends React.Component {
    collorStatus = () => {
        
        const {status} = this.props.appProps
        if(status === 'urgent'){
            return '#ef5350'
        }else if(status === 'done'){
            return '#8aaae5'
        } 
    }

    openModal= () =>{
        this.props.fetchDetailTodo(this.props.appProps.id)
        this.props.isDetail(true)
    }

    setDate = () => {
        const {due_date} = this.props.appProps
        return formatDate(due_date)
    }

    render (){
        const { title} = this.props.appProps
        return (
            <div>
                <Card style={{ width: '15rem', backgroundColor: this.collorStatus()}}>
                    <Card.Body>
                        <Card.Title style={{ color: '#ffffff' }}> Title: </Card.Title>
                        <Card.Title style={{ color: '#ffffff' }}>{title}</Card.Title>
                        <Card.Text style={{ color: '#ffffff' }}> Due Date: </Card.Text>
                        <Card.Text style={{ color: '#ffffff' }}> {this.setDate()} </Card.Text>
                        <Button onClick={this.openModal } style={{ backgroundColor: '#ffffff', color: this.collorStatus(), borderStyle: 'none' }}>See Detail</Button>
                    </Card.Body>
                </Card>
               
            </div>
        );
    }
}

const mapStoreToProps = (state, ownprops) => {
    return {
        appProps: ownprops,
        store: state.reducer
    }
}

export default connect(mapStoreToProps, {fetchDetailTodo: fetchDetailTodo, isDetail: isDetail})(CardTodo)