import React, { Component } from 'react';
import ResNavBar from './components/ResNavBar.js';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import OwnerView from './components/OwnerView.js';
import axios from 'axios';
import Register from './components/Register.js';
import { BrowserRouter } from 'react-router-dom';

// import './App.css';


class App extends Component {
  constructor(props) {

    super(props);

    this.socket = null;

    this.state = {

      email: '',
      toggleRegistration:false,
      owner: false
    };


  }

  componentDidMount = () => {
      //binding this
      const self = this;
      this.socket = new WebSocket('ws://localhost:3001');


      axios.get('users/', {

      })
      .then(function (response) {
        console.log('Response from server: ',response.data.email);
        self.setState({email:response.data.email});
        self.setState({owner:response.data.owner})
      })
      .catch(function (error) {
        console.log('error is ',error);
      })




  }

  updateSignIn = info => {
      this.setState({email:info['email']})
      this.setState({owner:info['owner']})
  }

  sendWSMessage = message => {
      this.socket.send(JSON.stringify(message));
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
        this.setState({owner:false});

      })
      .catch((error) => {
        console.log('error is ',error);
      })

  }


  render() {
    const isLoggedIn = this.state.email;
    let page = null;
    if(this.state.owner === true){
      page = <OwnerView socket={this.socket}/>
    } else if(isLoggedIn === "Guest" && this.state.toggleRegistration === false){
      page = <Login updateSignIn = {this.updateSignIn} showRegistration = {this.showRegistration} />
    } else if(this.state.toggleRegistration === true) {
      page = <Register updateSignIn = {this.updateSignIn} showRegistration = {this.showRegistration} />
    } else {
      page = <div className = 'container'><Menu sendWSMessage= {this.sendWSMessage} /></div>
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
