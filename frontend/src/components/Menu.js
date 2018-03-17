import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table} from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'
import ReactModal from 'react-modal';




class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mains: [],
      drinks: [],
      sides: [],
      orderQuantities: {},
      orderQuantitiesArray: [],
      showModal: false,
      subTotal: 0
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }


  componentDidMount = () => {

      axios.get('menu_items/mains', {

      })
      .then((response) => {
        this.setState({mains: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })


      axios.get('menu_items/drinks', {

      })
      .then((response) => {
        this.setState({drinks: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })


      axios.get('menu_items/sides', {

      })
      .then((response) => {
        this.setState({sides: response.data})
      })
      .catch((error) => {
        console.log('error is ',error);
      })



  }

  handleOpenModal = () => {
    this.updateOrderQuantitiesArray();

    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    this.clearInputs();
    this.setState({orderQuantitiesArray:[]})
    this.setState({orderQuantities:{}})
    this.setState({subTotal:0})
    this.setState({ showModal: false });
  }

  handleSubmitClick = () => {
      const quantities =  this.state.orderQuantities;
      //preventing sending quantity items that are invalid such as 0 or nothing
      for(let i in quantities){
        if( (quantities[i] === '') || (quantities[i] === '0')){
          delete quantities[i];
        }
      }
      axios.post('orders/new', {

        orderQuantities: quantities
      })
      .then((response) => {
        console.log('Order Info: ', response.data);
        this.props.sendWSMessage(response.data);
      })
      .catch((error) => {
        console.log('error is ',error);
      })
  }

  handleQuantityChange = (evt) => {
      let newOrderQuantities = this.state.orderQuantities;
      newOrderQuantities[evt.target.name] = evt.target.value;

  }

  updateOrderQuantitiesArray  = () => {
    this.setState({quantityArray:[]})

    axios.get('menu_items/', {

    })
    .then((response) => {
      const quantityArray = [];
      const quantityObj = this.state.orderQuantities;
      Object.keys(quantityObj).forEach(function(key) {

        for(let i = 0; i < response.data.length; i++){
          if(key.toString() ===response.data[i].id.toString()){
            const itemSubTotal = parseFloat(response.data[i].price  * quantityObj[key]).toFixed(2);
            quantityArray.push({id:key, quantity:quantityObj[key], name:response.data[i].name, itemSubTotal:itemSubTotal})
          }
        }
      })
      let subTotal = 0;
      for(let x = 0; x < quantityArray.length; x++){
        subTotal += Number.parseFloat(quantityArray[x].itemSubTotal);
      }
      subTotal.toFixed(2);
      this.setState({subTotal: subTotal});
      this.setState({orderQuantitiesArray:quantityArray})
    })
    .catch((error) => {
    })

  }

  //Clears all of the inputs
  clearInputs = () => {
    const mains = this.state.mains;
    const drinks = this.state.drinks;
    const sides =  this.state.sides;
    for(let i = 0; i < mains.length; i ++){
      document.getElementById(mains[i].id.toString()).reset();
    }
    for(let y = 0; y < drinks.length; y ++){
      document.getElementById(drinks[y].id.toString()).reset();
    }
    for(let x = 0; x < sides.length; x ++){
      document.getElementById(sides[x].id.toString()).reset();
    }

  }

  render() {



    let mainsCards = this.state.mains.map(item => {
      return (
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>${item.price}</CardSubtitle>
              </CardBody>
              <img width="100%" src={item.image} alt="Card image cap" />
              <CardBody>
                <CardText>{item.description}</CardText>
              </CardBody>
              <form id = {item.id}>
                <input type="text" name={item.id} onChange={this.handleQuantityChange} className="form-control"/>
              </form>
            </Card>
          </Col>
      )
    })

    let drinksCards = this.state.drinks.map(item => {
      return (
          <Col md="4">
            <Card>
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>${item.price}</CardSubtitle>
              </CardBody>
              <img width="100%" src={item.image} alt="Card image cap" />
              <CardBody>
                <CardText>{item.description}</CardText>
              </CardBody>
              <form id = {item.id}>
                <input type="text" name={item.id} onChange={this.handleQuantityChange} className="form-control"/>
              </form>
            </Card>
          </Col>
      )
    })

    let sidesCards = this.state.sides.map(item => {
      return (
          <Col md="4">
            <Card >
              <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>${item.price}</CardSubtitle>
              </CardBody>
              <img width="100%" src={item.image} alt="Card image cap" />
              <CardBody>
                <CardText>{item.description}</CardText>
              </CardBody>
              <form id = {item.id}>
                <input type="text" name={item.id} onChange={this.handleQuantityChange} className="form-control"/>
              </form>
            </Card>
          </Col>
      )
    })


    return (
      <div>
        <h2>Mains</h2>
        <Container fluid>
          <Row>
            {mainsCards}
          </Row>
        </Container>
        <h2>Sides</h2>
        <Container fluid>
          <Row>
            {sidesCards}
          </Row>
        </Container>
        <h2>Drinks</h2>
        <Container fluid>
          <Row>
            {drinksCards}
          </Row>
        </Container>

        <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
          <button onClick={this.handleCloseModal}>Close Modal</button>
                <Table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Item Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.orderQuantitiesArray.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.itemSubTotal}</td>
                        </tr>
                      ))}
                      <tr>SubTotal: ${this.state.subTotal.toFixed(2)}</tr>
                  </tbody>
                </Table>
        </ReactModal>

         <Button color="primary" className="submit-button" onClick={this.handleOpenModal}>Submit Order</Button>
      </div>
    )
  }
}
export default Menu;
