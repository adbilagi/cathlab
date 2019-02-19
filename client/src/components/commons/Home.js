import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import ExampleCard from "../commons/card";


export default class Home extends Component {
  state={
    Cards : [
      {
        imgSrc : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        title : "Login",
        subTitle : "Login",
        text : "Login Page",

      },
      {
        imgSrc : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        title : "Signin",
        subTitle : "New User",
        text : "Creating new user",

      },
      ,
      {
        imgSrc : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        title : "Change Password",
        subTitle : "Password change",
        text : "Password change by user",

      },
      {
        imgSrc : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        title : "Change Role",
        subTitle : "Set Roles",
        text : "Asign Role to users",

      }

    ]

    
  }
  render() {
    return (
    <div>
      <Container>
        <Row>
          {
            this.state.Cards.map((card)=>{
              return(<Col xs="4">
              <ExampleCard 
                imgSrc = {card.imgSrc}
                title = {card.title}
                subTitle = {card.subTitle}
                text = {card.text}

              />
              </Col>
              );
            })

          } 
        </Row>
      </Container>     
    </div>   
    )
  }
}
