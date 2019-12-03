import React from 'react';
import {connect} from 'react-redux';
import {isLoginRegister, isLogin, isGoogleSignIn, emptyTodos, shwoLoading} from '../store/actions';
import { GoogleLogout } from "react-google-login";
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
            <nav className="navbar navbar-expand-lg navbar-light justify-content-between" style={{backgroundColor: '#3c1a5b'}}>
                <h3 className="navbar-brand" style={{color: '#fff748'}}>REACT TO DO</h3>
        { this.props.reducer.isGoogleSignIn ? this.logOutGoogle() : <button onClick={this.logOutButt} className="btn btn-secondary">LOG OUT</button> }
            </nav>
        );
    }
    logOutGoogle = () => {
        return <GoogleLogout
            render={renderProps => (
                <button
                    className="btn btn-secondary"
                    onClick={renderProps.onClick}
                >
                    Log Out
                </button>
            )}
            onLogoutSuccess={this.logOutButt}
        />

    }
    logOutButt = () => {
            localStorage.clear()
          
             this.props.isLoginRegister(true)
             this.props.isLogin(true)
            this.props.isGoogleSignIn(false)
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

export default connect(mapStoreToprops, {isLoginRegister, isLogin, isGoogleSignIn, emptyTodos, shwoLoading})(Navbar)