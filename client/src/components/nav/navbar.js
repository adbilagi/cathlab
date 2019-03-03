import React from 'react';
import $ from "jquery";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
} from 'reactstrap'

class CurNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      logged : false,
      user :"",
      role : ""
    };


  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout(){
    $.ajax({
      method : "GET",
      url : "api/users/logout",
      success : (data)=>{
        // write code success
      }, 
      error : (err)=>{
        // write code for err
      }
    })
  }

  componentWillMount=()=>{
    let logged, user, role;
    logged = sessionStorage.getItem("logged");
    user = sessionStorage.getItem("user");
    role = sessionStorage.getItem("role");

    this.setState({
      logged : logged,
      user : user,
      role : role
    })
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
            {/* Login and Logout link */}
              <NavItem>
                {this.state.logged ? <NavLink href="" onClick={this.logout}>Logout</NavLink> : <NavLink href="/login">Login</NavLink> }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    
      
    );
  }
}



export default CurNavbar;
