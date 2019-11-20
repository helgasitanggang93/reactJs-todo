import React from 'react';
import Login from '../components/loginpage';
import Register from '../components/registerpage';
import {connect} from 'react-redux';
import {isLogin, isRegister} from '../store/actions'
class LoginRegister extends React.Component {
    render(){
       
        return (
            <div>
                {this.props.reducer.isLogin ? <Login errorServer={this.props.reducer.errorMessage}/> : null}
                {this.props.reducer.isRegister ? <Register  errorServer={this.props.reducer.errorMessage}/> : null}
                
            </div>
        );
    }
}

const mapStoreToProps = state => {
    return state
}

export default connect(mapStoreToProps, {isLogin, isRegister})(LoginRegister)