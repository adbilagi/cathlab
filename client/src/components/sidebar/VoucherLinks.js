import React, { Component } from 'react'
import {Container, Row, Col } from "reactstrap";
import Examplecard from "../commons/card";

export default class UsersLinks extends Component {
    state={
    
        Cards : [
          
      {

        title : "Purchase",
        text : "Purchase items",
        group : "Voucher",
        path : "/purchase"

      },

      {

        title : "Sale",
        text : "Sale items",
        group : "Voucher",
        path : "/sale"

      },
      {

        title : "Payment",
        text : "Pay out",
        group : "Voucher",
        path : "/payment"

      },
      {

        title : "Recipt",
        text : "Recive in",
        group : "Voucher",
        path : "/recive"

      },
      {

        title : "Contra",
        text : "Bank trasaction",
        group : "Voucher",
        path : "/contra"

      },          
      {

        title : "Credit Note",
        text : "Sale reversal",
        group : "Voucher",
        path : "/creditnote"

      },

      
      {

        title : "Debit Note",
        text : "Purchase Reversal",
        group : "Voucher",
        path : "/debitnote"

      }

        ]
      }

  

      render() {
        return (
        <div>
          <Container>
            <h3>Vouchers</h3>
            <Row>
              {
                this.state.Cards.map((card, index)=>{
    
                  return(card.group ==="Voucher" ? <Col xs="12" sm="6" lg="3" key={index}>
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
