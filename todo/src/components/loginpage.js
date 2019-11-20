import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux';
import {loginSubmit, isRegister, isLogin, emptyError} from '../store/actions'
import { Form, Alert} from 'react-bootstrap';

class Login extends React.Component {
    renderEmail = (formprops) => {
        return (
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                {...formprops.input} 
                type="text" 
                placeholder="enter your email..." />
            </Form.Group>
        );
    }
    renderPassword = (formprops) => {
        return (
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                 {...formprops.input}  
                type="password" 
                placeholder="enter your password..." />
            </Form.Group>
        );
    }
    onSubmit = (formValues, dispatch) => {
        this.props.loginSubmit(formValues)
        dispatch(reset('loginpage'))
    }
    toRegister = () => {
        this.props.emptyError()
        this.props.isLogin(false)
        this.props.isRegister(true)
    }
    render() {
        return (
            <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3" style={{border: '1px solid grey', padding: '15px'}}>
                             {this.props.errorServer !== '' ? <Alert variant='danger'>{this.props.errorServer}</Alert> : undefined}
                            <h3 className="text-center">Login Form</h3>
                            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                               <Field name="email" component={this.renderEmail}/>
                               <Field name="password" component={this.renderPassword}/>
                                <div className="text-center">
                                <button className="btn btn-primary">Login</button> <br/>
                                </div>
                            </Form>
                            <button onClick={this.toRegister} className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>         
        );
    }
}



const formWrapped = reduxForm({form: 'loginpage'})(Login)
export default connect(null, {loginSubmit, isLogin, isRegister, emptyError})(formWrapped)