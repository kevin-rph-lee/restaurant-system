import React, { Component } from 'react';
import ResNavBar from './components/ResNavBar.js';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import axios from 'axios'
// import './App.css';


class App extends Component {
  constructor(props) {

    super(props);


    this.state = {
      email: ''
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

  logout = () => {
      this.setState({email:'Guest'})
  }


  render() {
    const isLoggedIn = this.state.email;
    let page = null;
    if(isLoggedIn === "Guest"){
      page = <Login updateSignIn = {this.updateSignIn} />
    } else{
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
