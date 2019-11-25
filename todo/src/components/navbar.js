import React from 'react';
import {connect} from 'react-redux';
import {isLoginRegister, isLogin} from '../store/actions';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends React.Component {
    notLogin = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#3c1a5b'}}>
                <h3 className="navbar-brand" style={{color: '#fff748'}}>REACT TO DO</h3>
            </nav>
        );
    }
    isLogin = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#3c1a5b'}}>
                <h3 className="navbar-brand" style={{color: '#fff748'}}>REACT TO DO</h3>
                <button onClick={this.logOutButt} className="btn btn-secondary">LOG OUT</button>
            </nav>
        );
    }
    logOutButt = () => {
        localStorage.clear()
        this.props.isLoginRegister(true)
        this.props.isLogin(true)
        
    }
render(){
    return (
        <div>
            {this.props.reducer.isLoginRegister ? this.notLogin() : this.isLogin() }
        </div>
    );
}
}

const mapStoreToprops = state => {
    return state
}

export default connect(mapStoreToprops, {isLoginRegister, isLogin})(Navbar)