import React, { Component } from 'react';
import ResNavBar from './components/ResNavBar.js';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import axios from 'axios';
import Register from './components/Register.js';
import { BrowserRouter } from 'react-router-dom';

// import './App.css';


class App extends Component {
  constructor(props) {

    super(props);


    this.state = {
      email: '',
      toggleRegistration:false
    };


  }

  componentDidMount = () => {
      //binding this
      const self = this;

      axios.get('users/', {

      })
      .then(function (response) {
        console.log('Response from server: ',response.data);
        self.setState({email:response.data})
      })
      .catch(function (error) {
        console.log('error is ',error);
      })
  }

  updateSignIn = email => {
      this.setState({email:email})
  }

  showRegistration = () => {
    console.log('toggle')
    this.setState({
      toggleRegistration: !this.state.toggleRegistration
    });
  }

  logout = () => {

      axios.post('users/logout', {

      })
      .then((response) => {
        console.log('logging out...');
        this.setState({email:'Guest'});

      })
      .catch((error) => {
        console.log('error is ',error);
      })

  }


  render() {
    const isLoggedIn = this.state.email;
    let page = null;
    if(isLoggedIn === "Guest" && this.state.toggleRegistration === false){
      page = <Login updateSignIn = {this.updateSignIn} showRegistration = {this.showRegistration} />
    } else if(this.state.toggleRegistration === true) {
      page = <Register updateSignIn = {this.updateSignIn} showRegistration = {this.showRegistration} />
    } else {
      page = <div className = 'container'><Menu /></div>
    }


    return (
      <div className="App">
        <ResNavBar email = {this.state.email} logout = {this.logout}  />
        <div className="main">
          {page}
        </div>
      </div>
    );
  }
}

export default App;
