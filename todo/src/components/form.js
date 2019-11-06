import React from 'react';
import {Modal, Form , Alert} from 'react-bootstrap';
import {Field, reduxForm, reset} from 'redux-form';

class FormTodo extends React.Component {
    renderError({error, touched}){
        if (touched && error) {
            return (
                <Alert variant="danger">
                    {error}
                </Alert>
            );
        }       
    }

    renderInput = (formProps) => { 
       
        return (
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                {...formProps.input}
                type="text" 
                placeholder="Enter title" />
                {this.renderError(formProps.meta)}
            </Form.Group>
        );
    }

    renderTextArea = (formProps) => {
        return (
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                 {...formProps.input}
                as="textarea" 
                rows="3" 
                placeholder="Enter description" />
                 {this.renderError(formProps.meta)}
            </Form.Group>
        );
    }

    renderDate = (formProps) => {
        
        return (
            <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                {...formProps.input}
                type="date"/>
                 {this.renderError(formProps.meta)}
            </Form.Group>
        );
    }

    onSubmit =(formValues, dispatch)=>{
        this.props.onSubmit(formValues)
        this.props.closeModal()
        dispatch(reset('formTodo'))
    }
    render(){
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

const validate = (formValues) => {
    const errors = {}
    
    if(!formValues.title){
        errors.title = 'You must enter a title'
    }else if(formValues.title.length > 20){
        errors.title = 'Must be 20 Characters or less'
    }

    if(!formValues.description){
        errors.description = 'You must enter a description'
    }else if(formValues.description.length > 200){
        errors.description = 'Must be 20 Characters or less'
    }

    if (!formValues.due_date) {
        errors.due_date = 'You must enter a due date'
    }else if(formValues.due_date){
        let dateNow = (formValues.due_date).split('-')
        let getYear = new Date().getFullYear()
        let getMonth = new Date().getMonth()
        let getDay = new Date().getDate()
        if (Number(getYear) > Number(dateNow[0])) {
            errors.due_date = 'Year must be greather than now'

        } else if (Number(getDay) > Number(dateNow[2])) {
            errors.due_date = 'Date must be greather than now'
        } else if (Number(getMonth) + 1 > Number(dateNow[1])) {
            errors.due_date = 'Month must be greather than now'
        }
    }

    return errors
}

export default reduxForm({
    form: 'formTodo',
    validate: validate
})(FormTodo)

