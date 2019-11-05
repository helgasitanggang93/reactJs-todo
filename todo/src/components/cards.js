import React from 'react';
import {connect} from 'react-redux';
import {Button, Card} from 'react-bootstrap';
import {fetchDetailTodo, isDetail} from '../store/actions';

class CardTodo extends React.Component {
    collorStatus = () => {
        console.log(this.props)
        const {status} = this.props.appProps
        if(status === 'urgent'){
            return '#ef5350'
        }else if(status === 'done'){
            return '#8aaae5'
        } 
    }

    seeDetailHandler = (id) => {
        this.props.fetchDetailTodo(id)
        this.props.isDetail(true)
    }

    render (){
        const {id, title, due_date} = this.props.appProps
        return (
            <div>
                <Card key={id} style={{ width: '15rem', backgroundColor: this.collorStatus()}}>
                    <Card.Body>
                        <Card.Title style={{ color: '#ffffff' }}>{title}</Card.Title>
                        <Card.Text style={{ color: '#ffffff' }}>
                            {due_date}
                        </Card.Text>
                        <Button onClick={() => this.seeDetailHandler(id)} style={{ backgroundColor: '#ffffff', color: this.collorStatus(), borderStyle: 'none' }}>See Detail</Button>
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