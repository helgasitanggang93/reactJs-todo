import React from 'react';
import {connect} from 'react-redux';
import {Button, Card} from 'react-bootstrap';
import {fetchDetailTodo, isDetail} from '../store/actions';
import DetaiTodo  from '../components/detailCards'

class CardTodo extends React.Component {
    collorStatus = () => {
        
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

    setDate = () => {
        const {due_date} = this.props.appProps
        const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember']

        let formatDate = new Date(due_date)
        let setDay = formatDate.getDay()
        let setMonth = formatDate.getMonth()
        let setDate = formatDate.getDate()
        let setYear = formatDate.getFullYear()

        return `${dayList[setDay].slice(0, 3)}, ${setDate} ${monthList[setMonth]} ${setYear}`
    }

    render (){
        const {id, title} = this.props.appProps
        return (
            <div>
                <Card key={id} style={{ width: '15rem', backgroundColor: this.collorStatus()}}>
                    <Card.Body>
                        <Card.Title style={{ color: '#ffffff' }}> Title: </Card.Title>
                        <Card.Title style={{ color: '#ffffff' }}>{title}</Card.Title>
                        <Card.Text style={{ color: '#ffffff' }}> Due Date: </Card.Text>
                        <Card.Text style={{ color: '#ffffff' }}> {this.setDate()} </Card.Text>
                        <Button onClick={() => this.seeDetailHandler(id)} style={{ backgroundColor: '#ffffff', color: this.collorStatus(), borderStyle: 'none' }}>See Detail</Button>
                        <DetaiTodo/>
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