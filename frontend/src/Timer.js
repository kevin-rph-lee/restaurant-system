import React, {Component} from 'react';

export default class Timer extends Component{
  componentDidMount(){
    this.intervalID = setInterval(() => {
      this.props.listener();
    }, 250);
  }
  componentWillUnmount(){
    clearInterval(this.intervalID);
  }
  render(){ return false; }
}