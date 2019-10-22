import React from 'react';
import {Button, Card} from 'react-bootstrap';

class CardTodo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            color: '',
            colorButton: '',
            textColorButton:''
        }
    }

    componentDidMount() {
        this.collorStatus();
    }
   
    collorStatus = () => {
        const {status} = this.props
        if(status === 'urgent'){
            this.setState({color : '#ef5350 ', colorButton: '#FDD20EFF', textColorButton: '#ef5350 '})
        }else if(status ==='unUrgent'){
            this.setState({color : '#ffe67c', colorButton: '#295f2d', textColorButton: '#ffe67c'})
        }else if(status === 'done'){
            this.setState({color : '#8aaae5', colorButton: '#ffffff', textColorButton: '#8aaae5'})
        } 
    }

    seeDetailHandler = (id) => {
        this.props.seeDetail(id)
    }
    render (){
        const {id, title, due_date} = this.props
        return (
            <div>
                <Card style={{ width: '15rem', backgroundColor: `${this.state.color}`}}>
                    <Card.Body>
                        <Card.Title style={{color: `${this.state.colorButton}`}}>{title}</Card.Title>
                        <Card.Text style={{color: `${this.state.colorButton}`}}>
                            {due_date}
                         </Card.Text>
                        <Button onClick={() => this.seeDetailHandler(id)} style={{backgroundColor: `${this.state.colorButton}`, color: `${this.state.textColorButton}`, borderStyle: 'none'}}>See Detail</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default CardTodo