import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col} from 'reactstrap';
import axios from 'axios'


class Menu extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
    <Row>
      <Col md="4">
      <Card>
        <CardImg top width="100%" src="/images/3.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      </Col>
    </Row>
    );
  }
}
export default Menu;
