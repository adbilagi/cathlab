import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import ExampleCard from "../commons/card";


export default class Home extends Component {
  state={
    Cards : [
      {
        imgSrc : "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180",
        title : "Login",
        subTitile : "Login",
        text : "This will take to Login Page",

      }
    ]

    
  }
  render() {
    return (
    <div>
      {
        this.state.Cards.map((card)=>{
          return( <ExampleCard 

          />);
        })

      }      
    </div>   
    )
  }
}
