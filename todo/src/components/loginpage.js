import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button} from 'react-bootstrap';

class Login extends React.Component {
    
    render() {
        return (
            <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3" style={{border: '1px solid grey', padding: '15px'}}>
                            <h3 className="text-center">Login Form</h3>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="text" placeholder="enter your email..." />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="enter your password..." />
                                </Form.Group>
                                <div className="text-center">
                                <Button variant="outline-primary">Login</Button> <br/>
                               
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>         
        );
    }
}

export default Login