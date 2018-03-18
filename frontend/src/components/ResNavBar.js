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

class ResNavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
                <DropdownItem  onClick={this.props.showUserOrderView}>
                  See your orders
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
                <DropdownItem>
                  Business Intelligence
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
export default ResNavBar;
