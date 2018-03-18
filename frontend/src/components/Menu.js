import React, { Component } from 'react';
import { Container, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button, Table} from 'reactstrap';
import axios from 'axios'
import Countdown from 'react-countdown-moment'
import ReactModal from 'react-modal';
import { withAlert } from 'react-alert'
import FontAwesome from 'react-fontawesome'




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
    //Deleting any inputs that are 0 from the quantities state
    const orderQuantities = this.state.orderQuantities;
     for(let x in orderQuantities){
      if(orderQuantities[x] === '0'){
        delete orderQuantities[x]
      }
    }

    //Checking to see if there is any invalid input
    for(let i in orderQuantities){
      if(isNaN(orderQuantities[i])){
        this.clearInputs();
        this.handleCloseModal();
        this.props.alert.show('Invalid input! Quantity must be a NUMBER');
        return;
      }
    }
    //Checking to see if any input is submitted, if none, throws an error alert
    for(let y in orderQuantities){
      if(orderQuantities[y].length !== 0){
        //Updates the orderQuantitiesArray with the values in the inputs
        //the orderQuantitiesArray controls what is shown within the modal
        this.updateOrderQuantitiesArray();
        this.setState({ showModal: true });
        return;
      }
    }
    this.props.alert.show('Invalid input! You must order something to submit');
  }

  handleCloseModal = () => {
    this.clearInputs();
    this.setState({orderQuantitiesArray:[]})
    this.setState({orderQuantities:{}})
    this.setState({subTotal:0})
    this.setState({ showModal: false });
  }

  handleSubmit = () => {
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
        //Sends the data to the websocket server
        this.props.sendWSMessage(response.data);
        //Clearing inputs and the states
        this.clearInputs();
        this.handleCloseModal();

        //Alerting the user of their order #
        // const alertString = 'Your order is submitted! Order #: ' + response.data['id'];
        // this.props.alert.show(alertString);
        this.props.showUserOrderView()

      })
      .catch((error) => {
        console.log('error is ',error);
        this.props.alert.show('Error!');
      })
  }

  handleQuantityChange = () => {
      let newOrderQuantities = this.state.orderQuantities;
      const references = this.refs;
      //Grabbing all of the values in the different text inputs for each menu item
      for(let i in references){
        newOrderQuantities[i] = references[i]['value'];
      }
      //Deleting any which are blank
      for(let y in newOrderQuantities){
        if(newOrderQuantities[y].length === 0){
          delete newOrderQuantities[y];
        }
      }
      this.setState({orderQuantities:newOrderQuantities});
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
            const ref = 'item' + key;
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
    //Clearing out all of the text boxes
    for(let i in this.refs){
      this.refs[i]['value'] = '';
    }
  }

  handleUpArrow = (e) => {
      const id = parseInt(e.target.name)
      const quantities = this.state.orderQuantities;
      for(let i in this.refs){
        if(parseInt(i) === id){
          if(this.refs[i]['value'].length === 0  || isNaN(this.refs[i]['value'])) {
            this.refs[i]['value'] = '1'
            quantities[i] = '1'
            this.setState({orderQuantities:quantities});
          } else if (this.refs[i]['value'] >= 0) {
            let quantity = parseInt(this.refs[i]['value'])
            quantity ++;
            this.refs[i]['value'] = quantity.toString();
            quantities[i] = quantity.toString();
            this.setState({orderQuantities:quantities});
          }
        }
      }
  }
  handleDownArrow = (e) => {
      const id = parseInt(e.target.name)
      const quantities = this.state.orderQuantities;
      for(let i in this.refs){
        if(parseInt(i) === id){
          if(this.refs[i]['value'].length === 0 || this.refs[i]['value'] === '0'  || isNaN(this.refs[i]['value'])) {
            this.refs[i]['value'] = '0'
            quantities[i] = '0'
            this.setState({orderQuantities:quantities});
          } else {
            let quantity = parseInt(this.refs[i]['value'])
            quantity --;
            this.refs[i]['value'] = quantity.toString();
            quantities[i] = quantity.toString();
            this.setState({orderQuantities:quantities});
          }
        }
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
                <input type="text" name={item.id} ref={item.id} onChange={this.handleQuantityChange} className="form-control"/>
                <div className="arrow-buttons">
                  <Button onClick={this.handleUpArrow} name={item.id}>
                    +
                  </Button>
                  <Button onClick={this.handleDownArrow} name={item.id}>
                    -
                  </Button>
                </div>
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
                <input type="text" name={item.id} ref={item.id} onChange={this.handleQuantityChange} className="form-control"/>
                <div className="arrow-buttons">
                  <Button onClick={this.handleUpArrow} name={item.id}>
                    +
                  </Button>
                  <Button onClick={this.handleDownArrow} name={item.id}>
                    -
                  </Button>
                </div>
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
                <input type="text" name={item.id} ref={item.id} onChange={this.handleQuantityChange} className="form-control"/>
                <div className="arrow-buttons">
                  <Button onClick={this.handleUpArrow} name={item.id}>
                    +
                  </Button>
                  <Button onClick={this.handleDownArrow} name={item.id}>
                    -
                  </Button>
                </div>
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


        <ReactModal isOpen={this.state.showModal}>
          <h1>Confirm your order</h1>
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
                <th>SubTotal: ${this.state.subTotal.toFixed(2)}</th>
            </tbody>
          </Table>
          <Button onClick={this.handleCloseModal}>Cancel</Button>
          <Button onClick={this.handleSubmit}>Submit!</Button>
        </ReactModal>

        <Button color="primary" className="submit-button" onClick={this.handleOpenModal}>Submit Order</Button>

      </div>
    )
  }
}
export default withAlert(Menu);
