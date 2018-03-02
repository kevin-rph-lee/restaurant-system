import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button} from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'




class OwnerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mains: [],
      drinks: [],
      sides: [],
      orderQuantities: {}
    };
  }


}
export default OwnerView;
