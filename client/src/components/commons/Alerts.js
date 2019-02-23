import React, { Component } from 'react';
import {Alert} from "reactstrap";


export default class Alerts extends Component {
  render() {
    return (
      <div>
        {this.props.alertSuccess ? <Alert color="success">{this.props.alertSuccessMessage}</Alert> : ""}
        {this.props.alertError ? <Alert color="danger">{this.props.alertErrorMessage}</Alert> : ""}     
      </div>
    )
  }
}
