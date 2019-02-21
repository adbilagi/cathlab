import React, { Component } from 'react';
import {Container, Row, Col } from "reactstrap";
import Examplecard from "../commons/card";


export default class Home extends Component {
  state={
    
    Cards : [
      {
        title : "Login",
        text : "Login Page",
        group : "user",
        path : "/user/login"
      },
      {

        title : "Sign Up",
        text : "Creating new user",
        group : "user",
        path  : "/user/signup"

      },
      
      {

        title : "Change Password",
        text : "Password change",
        group : "user",
        path : "/user/changepassword"

      },
      {

        title : "Change Role",
        text : "Asign Role to users",
        group : "user",
        path : "/user/changepassword"

      },
      
      {

        title : "Purchase",
        text : "Purchase items",
        group : "Voucher",
        path : "/voucher/invoices/purchase"

      },

      {

        title : "Sale",
        text : "Sale items",
        group : "Voucher",
        path : "/voucher/invoices/sale"

      },
      {

        title : "Payment",
        text : "Pay out",
        group : "Voucher",
        path : "/voucher/transaction/payment"

      },
      {

        title : "Recipt",
        text : "Recive in",
        group : "Voucher",
        path : "/voucher/transaction/recive"

      },
      {

        title : "Contra",
        text : "Bank trasaction",
        group : "Voucher",
        path : "/voucher/transaction/contra"

      },          
      {

        title : "Credit Note",
        text : "Sale reversal",
        group : "Voucher",
        path : "/voucher/invoices/creditnote"

      },

      
      {

        title : "Debit Note",
        text : "Sale Reversal",
        group : "Voucher",
        path : "/voucher/invoices/debitnote"

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
              if(card.group === "Voucher"){
                return(<Col xs="12" sm="6" lg="3" key={index}>
                <Examplecard 
                  title = {card.title}
                  text = {card.text}
                  path = {card.path} 
                />
                </Col>
                );
              }
            })} 
        </Row>
        <hr/>
        <h3>Users</h3>
        <Row>
          {
            this.state.Cards.map((card, index)=>{
              if(card.group === "user"){
                return(<Col xs="12" sm="6" lg="3" key={index}>
                <Examplecard 
                  title = {card.title}
                  text = {card.text}
                  path = {card.path} 
                />
                </Col>
                );
              }
            })
          } 
        </Row>
      </Container>     
    </div>   
    )
  }
}
