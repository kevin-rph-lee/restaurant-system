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

import axios from 'axios'


class ResNavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      email:null
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount(){
      //binding this
      axios.get('users/', {

      })
      .then(function (response) {
        // self.setState({menuItems:response.data})
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('error is ',error);
      })
  }

  render() {
    return (
      <div>
        <Navbar color="grey" className="navbar-dark bg-dark" light expand="md">
          <NavbarBrand href="/">Rikimaru Ramen</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Github</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default ResNavBar;
