import React, { Component } from 'react';
import {Alert} from "reactstrap";


export default class Alerts extends Component {

 titleCase=(str)=>{
   return `${str.substr(0,1).toLocaleUpperCase()}${str.substr(1).toLocaleLowerCase()}`;
  }

  render() {
    return (
      <div>
        {this.props.alertSuccess ? <Alert color="success">{this.titleCase(this.props.alertSuccessMessage)}</Alert> : ""}
        {this.props.alertError ? <Alert color="danger">{ this.titleCase(this.props.alertErrorMessage) }</Alert> : ""}     
      </div>
    )
  }
}