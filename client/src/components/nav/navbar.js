import React from 'react';
import {connect} from "react-redux";

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
                <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>

            {/* Login and Logout link */}
              <NavItem>
                {
                  this.props.logged ? <NavLink href={this.props.userLogout}>Logout</NavLink> : <NavLink href="/login">Login</NavLink>
                }
              
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    
      
    );
  }
}


const mapStateToProps= (state)=>{
  return{
    logged : state.logged
  }
}

const mapDispachToProps =(dispach)=>{
return {
  userLogout : ()=>{
    return dispach({
      type : "LOGIN",
      payload : false
    })
  }
}
}

export default  connect(mapStateToProps,mapDispachToProps)(CurNavbar);