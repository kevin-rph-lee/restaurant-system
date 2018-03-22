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
  Link, BrowserRouter, Redirect, withRouter} from 'react-router-dom';

// import './App.css';


class App extends Component {
  constructor(props) {

    super(props);

    this.socket = new WebSocket('ws://localhost:3001');

    this.state = {
      email: 'Guest',
      owner: false
    };


      axios.get('users/', {

      })
      .then((response) => {
        this.setState({email:response.data.email});
        this.setState({owner:response.data.owner})
      })
      .catch((error) => {
        console.log('error is ',error);
      })
  }

  componentDidMount = () => {

  }

  updateSignIn = info => {
      this.setState({email:info['email']})
      this.setState({owner:info['owner']})
  }

  sendWSMessage = message => {
      this.socket.send(JSON.stringify(message));
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



    return (

      <div className="App">
        <ResNavBar email = {this.state.email} logout = {this.logout} owner = {this.state.owner} showUserOrderView = {this.showUserOrderView} showReportsView = {this.showReportsView}  />
        <div className="main">
          <Switch>
            <Route path='/register' render={(props) => <Register updateSignIn = {this.updateSignIn} />} />
            <Route path='/menu' render={(props) => <Menu sendWSMessage= {this.sendWSMessage} showUserOrderView = {this.showUserOrderView} email = {this.state.email}  owner = {this.state.owner} />} />
            <Route path='/ownerview' render={(props) => <OwnerView socket={this.socket}  sendWSMessage= {this.sendWSMessage} owner = {this.state.owner} email = {this.state.email} />} />
            <Route path='/reportsview' render={(props) => <ReportsView />} />
            <Route path='/userorderview' render={(props) => <UserOrderView socket={this.socket}/>} />
            <Route path='/' render={(props) => <Login updateSignIn = {this.updateSignIn} owner = {this.state.owner} email = {this.state.email}/>}  />
          </Switch>
        </div>
      </div>

    );
  }
}

export default withRouter(App);
