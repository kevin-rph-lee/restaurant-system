import React, { Component } from 'react';
import ResNavBar from './components/ResNavBar.js';
import Login from './components/Login.js';
import axios from 'axios'
// import './App.css';

class App extends Component {
  constructor(props) {

    super(props);


    this.state = {
      email: ''
    };

    this.checkSignInStatus = this.checkSignInStatus.bind(this);


  }

  componentDidMount(){
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

  checkSignInStatus(){
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


  render() {
    return (
      <div className="App">
        <ResNavBar email = {this.state.email}  />
        <div className="main">
          <Login checkSignInStatus = {this.checkSignInStatus} />
        </div>
      </div>
    );
  }
}

export default App;
