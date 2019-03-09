import React, { Component } from 'react'
import {Container, Row, Col } from "reactstrap";
import Examplecard from "../commons/card";

export default class AccountInfo extends Component {
    state={
    
        Cards : [
          {
            title : "Create Group",
            text : "Creates new group",
            group : "groups",
            path : "/creategroup"
          },          {
            title : "Alter Group",
            text : "Edit gropp",
            group : "groups",
            path : "/altergroup"
          },
          {
            title : "Delete Group",
            text : "Deletes group",
            group : "groups",
            path : "/deletegroup"
          },
          {
            title : "Create Ledger",
            text : "Creates new ledger",
            group : "ledger",
            path : "/createledget"
          },          {
            title : "Alter Ledger",
            text : "Edit ledger",
            group : "ledger",
            path : "/alterledger"
          },
          {
            title : "Delete ledger",
            text : "Deletes ledger",
            group : "ledger",
            path : "/deleteledger"
          }
        ]
      }

  

      render() {
        return (
        <div>
          <Container>
            <h3>Groups</h3>
            <Row>
              {
                this.state.Cards.map((card, index)=>{
    
                  return(card.group ==="groups" ? <Col xs="12" sm="6" lg="3" key={index}>
                  <Examplecard 
                    title = {card.title}
                    text = {card.text}
                    path = {card.path} 
                  />
                  </Col>: "");
                })
              } 
            </Row>

            <hr/>

            <h3>Ledger</h3>
            <Row>
              {
                this.state.Cards.map((card, index)=>{
    
                  return(card.group ==="ledger" ? <Col xs="12" sm="6" lg="3" key={index}>
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
