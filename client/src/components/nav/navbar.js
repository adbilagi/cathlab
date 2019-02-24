import React from 'react';
import {AppContext} from "../commons/context"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem 
} from 'reactstrap'

export default class CurNavbar extends React.Component {
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
    return (
      
      <div>
        <Navbar color="info" light expand="md" style={{marginBottom: "0.5em"}}>
          <NavbarBrand href="/">Cath Lab</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            {/* Home link */}
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>

              {/* Singn in link */}
              <NavItem>
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>

            {/* Login and Logout link */}
              <NavItem>
              <AppContext.Consumer>
                  {
                    (c)=>{
                      if(c.loggedState === "Logout"){
                        return <NavLink href="/login">Login</NavLink>
                      }else{
                        return <NavLink href="/logout">{c.loggedUser} {" "}Logout</NavLink>

                      }
                      
                    } 
                  }
              </AppContext.Consumer>
              </NavItem>
              {/* Drop down */}
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
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
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    
      
    );
  }
}