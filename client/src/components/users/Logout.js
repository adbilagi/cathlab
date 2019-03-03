import React, { Component } from 'react'
import $ from "jquery";
import Alerts from "../commons/Alerts"
import {  Container, Row, Col} from 'reactstrap';
export default class Logout extends Component {
  state={
    logged : true,
    user : "",
    role : "",
    ajaxSuccess : false,
    ajaxError : false,
    ajaxSuccessMessage : "",
    ajaxErrorMessage : ""
  }

  componentWillMount(){
    $.ajax({
      method : "GET",
      url : "api/users/logout",
      success : (data)=>{
        sessionStorage.removeItem("logged");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("role");
        this.setState({
          logged : false,
          user : "",
          role : "",
          ajaxSuccess : true,
          ajaxError : false,
          ajaxSuccessMessage : "You succssfully  logged out",
          ajaxErrorMessage : ""
        })

      // write code for force update after success ajax to change navbar menu
      }, 
      error : (err)=>{
        // write code for err
        this.setState({
          ajaxSuccess : false,
          ajaxError : true,
          ajaxSuccessMessage : "",
          ajaxErrorMessage : "Could not log out"
        })
      }
    })
  }


  render() {
    return (
      <div> 
        <Container>
          <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>          
              <Alerts 
              alertSuccess = {this.state.ajaxSuccess}
              alertError = {this.state.ajaxError}
              alertSuccessMessage = {this.state.ajaxSuccessMessage}
              alertErrorMessage = {this.state.ajaxErrorMessage}
              />
            </Col>

          </Row>
        </Container>
      </div>
    )
  }
}
