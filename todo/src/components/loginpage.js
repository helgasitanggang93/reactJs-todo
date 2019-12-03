import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Field, reduxForm, reset} from 'redux-form';
import {connect} from 'react-redux';
import {loginSubmit, isRegister, isLogin, emptyError, ggSignIn, fetchTodoData} from '../store/actions'
import { Form, Alert} from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
 

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
   
    responseGoogle = response => {
       this.props.ggSignIn(response.tokenId)
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
                            <div className="text-center">
                            {/* <div id='google-sign-in-button'/> */}
                                <GoogleLogin
                                    clientId='1056392817226-rndeghtfhkcmirvrll080usji8fmted4.apps.googleusercontent.com' //TO BE CREATED
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                />
                            <button type="button" className="btn btn-link" onClick={this.toRegister}>Don't Have Any Account yet?</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>         
        );
    }
}



const formWrapped = reduxForm({form: 'loginpage'})(Login)
export default connect(null, {loginSubmit, isLogin, isRegister, emptyError, ggSignIn, fetchTodoData})(formWrapped)