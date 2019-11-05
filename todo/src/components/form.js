import React from 'react';
import {Modal, Form } from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';

class FormTodo extends React.Component {
    renderInput(formProps){
     
        return (
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                {...formProps.input}
                type="text" 
                placeholder="Enter title" />
            </Form.Group>
        );
    }
    renderTextArea(formProps){
       
        return (
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                 {...formProps.input}
                as="textarea" 
                rows="3" 
                placeholder="Enter description" />
            </Form.Group>
        );
    }
    renderDate(formProps){
        
        return (
            <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                {...formProps.input}
                type="date"/>
            </Form.Group>
        );
    }
    onSubmit =(formValues)=>{
        console.log(formValues);
        this.props.closeModal()
        
    }
    render(){
        console.log(this.props)
        return(
           <div>
                <Modal show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create To Do</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                            <Field name="title" component={this.renderInput} />
                            <Field name="description" component={this.renderTextArea} />
                            <Field name="due_date" component={this.renderDate} />
                            <Modal.Footer>
                                <button className="btn btn-primary">
                                    Save Changes
                                </button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
           </div>
        );
    }
}


export default reduxForm({
    form: 'formTodo'
})(FormTodo)