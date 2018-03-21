import React, { Component } from 'react';
import ResNavBar from './components/ResNavBar.js';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import OwnerView from './components/OwnerView.js';
import UserOrderView from './components/UserOrderView.js';
import ReportsView from './components/ReportsView.js';
import axios from 'axios';
import Register from './components/Register.js';
import {HashRouter,
  Switch,
  Route,
  Link, BrowserRouter, Redirect} from 'react-router-dom';

// import './App.css';


class App extends Component {
  constructor(props) {

    super(props);

    this.socket = null;

    this.state = {
      email: '',
      toggleRegistration:false,
      owner: false,
      toggleUserOrderView: false,
      toggleReportsView: false
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
    console.log('test');
  }

  showUserOrderView = () => {
    this.setState({
      toggleUserOrderView: !this.state.toggleUserOrderView
    });
  }

  showReportsView = () => {
    console.log('Toggle?');
    this.setState({
      toggleReportsView: !this.state.toggleReportsView
    });
  }

  logout = () => {

      axios.post('users/logout', {

      })
      .then((response) => {
        console.log('logging out...');
        this.setState({email:'Guest'});
        this.setState({owner:false});
        this.setState({toggleUserOrderView:false});
        this.setState({toggleReportsView:false});
      })
      .catch((error) => {
        console.log('error is ',error);
      })

  }


  render() {
    const isLoggedIn = this.state.email;
    // let page = null;
    // if(this.state.owner === true && this.state.toggleReportsView === true){
    //   page = <ReportsView />
    // }
    // else if(this.state.owner === true && this.state.toggleReportsView === false){
    //   page = <OwnerView socket={this.socket}  sendWSMessage= {this.sendWSMessage}/>
    // } else if((isLoggedIn === "Guest" || isLoggedIn === undefined) && this.state.toggleRegistration === false){
    //   page = <Login updateSignIn = {this.updateSignIn} showRegistration = {this.showRegistration} />
    // } else if(this.state.toggleRegistration === true) {
    // const Register = <Register updateSignIn = {this.updateSignIn} showRegistration = {this.showRegistration} />
    // } else if(this.state.toggleUserOrderView === false){
    //   page = <div className = 'container'><Menu sendWSMessage= {this.sendWSMessage} showUserOrderView = {this.showUserOrderView} /></div>
    // } else if(this.state.toggleUserOrderView === true) {
    //   page = <div className = 'container'><UserOrderView socket={this.socket}/></div>
    // }
    // if(this.state.email === 'Guest' || this.state.email === undefined){
    //   return (<Redirect to="/login"/>)
    // }

    return (

      <div className="App">
        <ResNavBar email = {this.state.email} logout = {this.logout} owner = {this.state.owner} showUserOrderView = {this.showUserOrderView} showReportsView = {this.showReportsView}  />
        <div className="main">
          <Switch>
            <Route path='/register' render={(props) => <Register updateSignIn = {this.updateSignIn} />} />
            <Route path='/menu' render={(props) => <Menu sendWSMessage= {this.sendWSMessage} showUserOrderView = {this.showUserOrderView} email = {this.state.email} />} />
            <Route path='/ownerview' render={(props) => <OwnerView socket={this.socket}  sendWSMessage= {this.sendWSMessage} />} />
            <Route path='/reportsview' render={(props) => <ReportsView />} />
            <Route path='/userorderview' render={(props) => <UserOrderView socket={this.socket}/>} />
            <Route path='/' render={(props) => <Login updateSignIn = {this.updateSignIn} owner = {this.state.owner} email = {this.state.email}/>}  />
          </Switch>
        </div>
      </div>

    );
  }
}

export default App;
