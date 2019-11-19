import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button} from 'react-bootstrap';

class Register extends React.Component {
    render() {
        return (
            <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3" style={{border: '1px solid grey', padding: '15px'}}>
                            <h3 className="text-center">Form Register</h3>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="enter your name..." />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="text" placeholder="enter your email..." />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="enter your password..." />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control as="select">
                                        <option>Software Engineer</option>
                                        <option>Consultant</option>
                                        <option>Software Quality</option>
                                    </Form.Control>
                                </Form.Group>
                                <div className="text-center">
                                <Button variant="outline-primary">Submit</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>         
        );
    }
}

export default Register