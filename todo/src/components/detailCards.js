import React from 'react'; 
import {Button, Card} from 'react-bootstrap';
class DetailTodo extends React.Component {
    render(){
        return(
            <div>
                 <Card >
                    <Card.Body>
                        <Card.Title >Todo Title</Card.Title>
                        <Card.Text>
                            Due Date
                         </Card.Text>
                         <Card.Text>
                            Description
                         </Card.Text>
                    </Card.Body>
                    <Card.Footer className="m-1">
                        <Button className="m-1" variant="info">Done</Button>
                        <Button className="m-1" variant="warning">Update</Button>
                        <Button className="m-1" variant="danger">Delete</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

export default DetailTodo