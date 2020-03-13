import React from "react";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import TodoList from "./containers/todosList";
import LoginRegister from "./containers/loginregister";
import { isLoginRegister, isLogin, fetchTodoData } from "./store/actions";

class App extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.isLoginRegister(true);
      this.props.isLogin(true);
    } else {
      this.props.isLoginRegister(false);
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.reducer.isLoginRegister ? <LoginRegister /> : <TodoList />}
      </div>
    );
  }
}

const mapStore = state => {
  return state;
};

export default connect(mapStore, { isLoginRegister, isLogin, fetchTodoData })(
  App
);
