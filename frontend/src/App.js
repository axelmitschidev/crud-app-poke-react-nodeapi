import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ManagePage from './pages/ManagePage/ManagePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import React from 'react';
import axios from 'axios';
import './App.css';

function isObjEmpty(obj) {
	for (var prop in obj) {
	  if (obj.hasOwnProperty(prop)) return false;
	}
  
	return true;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      redirect: false
    }
  }

  user_login = async () => {
    const username = document.getElementById('username').value;
		const body = await axios.post('http://localhost:8080/user/login', { username: username });
		this.setState({ user: body.data });
    console.log('user_login() in App');
  }

  render() {
    if (!isObjEmpty(this.state.user)) {
      return <ManagePage user={ this.state.user } />
    }

    return (
      <Router>
        <Routes>
          <Route path="/manage" element={ <ManagePage user={ this.state.user } /> }></Route>
          <Route path="/login" element={ <LoginPage userLoginFunc={ this.user_login } /> }></Route>
          <Route path="/register" element={ <RegisterPage /> }></Route>
          <Route path="*" element={ <LoginPage userLoginFunc={ this.user_login } /> }></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;