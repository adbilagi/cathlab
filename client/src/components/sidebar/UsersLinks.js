import React, { Component } from 'react'
import {Container, Row, Col } from "reactstrap";
import Examplecard from "../commons/card";

export default class UsersLinks extends Component {
    state={
    
        Cards : [
          {
            title : "Login",
            text : "Login Page",
            group : "user",
            path : "/login"
          },
          {
            title : "Logout",
            text : "Logout User",
            group : "user",
            path : "/logout"
          },
          {
    
            title : "Sign Up",
            text : "Creating new user",
            group : "user",
            path  : "/signup"
    
          },
          
          {
    
            title : "Change Password",
            text : "Password change",
            group : "user",
            path : "/changepassword"
    
          },
          {
    
            title : "Set Active User",
            text : "Set user acive/inactive",
            group : "user",
            path : "/setactivityuser"
    
          },
          {
    
            title : "Change Role",
            text : "Asign Role to users",
            group : "user",
            path : "/changerole"
    
          }
        ]
      }

  

      render() {
        return (
        <div>
          <Container>
            <h3>Users</h3>
            <Row>
              {
                this.state.Cards.map((card, index)=>{
    
                  return(card.group ==="user" ? <Col xs="12" sm="6" lg="3" key={index}>
                  <Examplecard 
                    title = {card.title}
                    text = {card.text}
                    path = {card.path} 
                  />
                  </Col>: "");
                })
              } 
            </Row>
          </Container>     
        </div>   
        )
      }
}
