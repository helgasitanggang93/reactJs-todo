import React from 'react';
import {connect} from 'react-redux';
import {createTodo, formModalHandler} from '../store/actions';
import FormTodo from '../components/form';
import {Button} from 'react-bootstrap';
class CreateFormTodo extends React.Component {
    handleOpenModal = () => {
        this.props.formModalHandler(true)
      }
      handleClose = () =>{
        this.props.formModalHandler(false)
      }

    onSubmit = (formValues)=>{
        this.props.createTodo(formValues)
        this.handleClose()
        
    }
    render(){
        return(
           <div>
            <Button variant="primary" onClick={this.handleOpenModal}>
                    Create To Do
            </Button>
            <FormTodo
              closeModal={this.handleClose}
              onSubmit={this.onSubmit}
              show={this.props.reducer.isForm}
            />
           </div>
        );
    }
}

const mapStoreToProps = state => {
    return state
} 

export default connect(mapStoreToProps, {createTodo: createTodo, formModalHandler: formModalHandler})(CreateFormTodo)