import React from 'react';
import {BrowserRouter} from 'react-router-dom'; 
import Navbar from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux';
import TodoList from './containers/todosList';
import LoginRegister from './containers/loginregister';
import {isLoginRegister, isLogin} from './store/actions';

class App extends React.Component {
  componentDidMount() {
    if(!localStorage.token){
      this.props.isLoginRegister(true)
      this.props.isLogin(true)
    }else{
      this.props.isLoginRegister(false)
    }
  }
  render(){
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      {this.props.reducer.isLoginRegister ? <LoginRegister/> : <TodoList/>}
    </div>
    </BrowserRouter>
  );
  }
}

const mapStore = state => {
  return state
}

export default connect(mapStore, {isLoginRegister, isLogin})(App)
