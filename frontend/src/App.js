import React, { Component } from 'react';
import ResNavBar from './components/ResNavBar.js';
import Login from './components/Login.js';

// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ResNavBar />
        <div className="main">
          <Login />
        </div>
      </div>
    );
  }
}

export default App;
