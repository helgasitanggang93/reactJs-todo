import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
class FormTodo extends React.Component {
    constructor(props){
        super(props);
        this.props = props
        
    }
    
    render(){
        return(
           <div>
                <Modal show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create To Do</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" placeholder="Enter description" />
                            </Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control as="select">
                                <option>Urgent</option>
                                <option>No Urgent</option>
                            </Form.Control>
                            <Form.Group>
                                <Form.Label>Due Date</Form.Label>
                                <Form.Control type="date"/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.closeModal}>
                            Close
                        </Button>
                        <Button  variant="primary" onClick={this.props.closeModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
           </div>
        );
    }
}

export default FormTodo