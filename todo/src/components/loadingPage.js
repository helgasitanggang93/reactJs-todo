import React from 'react';
import {Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class Loading extends React.Component {
    render(){
        return (
            <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner animation="grow" variant="primary" size="md"/>
            </div>
        );
    }
}

export default Loading