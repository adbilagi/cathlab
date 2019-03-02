import React from 'react';
import {connect} from "react-redux"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
} from 'reactstrap'
import { type } from 'os';

class CurNavbar extends React.Component {
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
                <NavLink href="" onClick={this.props.logout}>Logout</NavLink>
              </NavItem>

            {/* Login and Logout link */}
              <NavItem>
               <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    
      
    );
  }
}

const mapStatetToProps = (state)=>{
  return {
    logged : state.logged
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    logout : ()=>{
      return dispatch({
        type : "LOGIN",
        payload : {user : "", role : "", logged: false, responceText : "Successfully Logged Out", alertErrorLogged : false}
      })
    }
  }

}

export default connect(mapStatetToProps, mapDispatchToProps)(CurNavbar);
