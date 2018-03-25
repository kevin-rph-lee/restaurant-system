import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import FontAwesome from 'react-fontawesome'
import {withRouter} from 'react-router-dom';

class ResNavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      location: ''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  showReportsView = () => {
    this.props.history.push('/reportsview');
  }

  showUpdateMenuItemView = () => {
    this.props.history.push('/updatemenuitem');
  }

  showUserOrdersView = () => {
    console.log('attempting')
    this.props.history.push('/userorderview');
  }

  showOwnerView = () => {
    this.props.history.push('/ownersview');
  }


  showMenu = () => {
    this.props.history.push('/menu');
  }


  render() {

    let dropDown = null;
    if(this.props.email !== 'Guest' && this.props.owner === false){
      dropDown =
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret >
                <FontAwesome
                  className="super-crazy-colors"
                  name="edit"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.showMenu}>
                  Menu
                </DropdownItem>
                <DropdownItem onClick={this.showUserOrdersView}>
                  Your Orders
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.props.logout}>
                  Logoff
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
    } else if (this.props.owner === true){
      dropDown =
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret >
                <FontAwesome
                  className="super-crazy-colors"
                  name="edit"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={this.showOwnerView}>
                  Dashboard
                </DropdownItem>
                <DropdownItem onClick={this.showReportsView}>
                  Business Intelligence
                </DropdownItem>
                <DropdownItem onClick={this.showUpdateMenuItemView}>
                  Update Menu Item
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.props.logout}>
                  Logoff
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
    }


    return (
      <div>
        <Navbar color="grey" className="navbar-dark bg-dark" light expand="md">
          <NavbarBrand href="/">Rikimaru Ramen</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink>{this.props.email}</NavLink>
              </NavItem>
            {dropDown}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default withRouter(ResNavBar);
