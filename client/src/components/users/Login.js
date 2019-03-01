import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert} from 'reactstrap';
import Alerts from "../commons/Alerts"
import $ from "jquery";
import {connect} from "react-redux";

class CurLogin extends Component {
  state = {
    user : "",
    password : ""
  }

  onChange = (e)=>{
    this.setState({
      [e.target.name]  : e.target.value
    })

  }


  render() {
    return (
            <div>
              <Container>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <h3>Login</h3>
                      <Form>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}/>
                        </FormGroup>
                        <Button color="info" onClick={()=>this.props.userLogin(this.state.user, this.state.password)} >Login</Button>{' '}
                      </Form>
                        <br />
                        {this.props.alertErrorLogged ?  <Alert color="danger">{this.props.responceText}</Alert> : ""}
                      
                  </Col>
                </Row>

              </Container>        
            </div>
    )
  }
}


const mapStateToProps= (state)=>{
  return{
    logged : state.logged,
    alertErrorLogged : state.alertErrorLogged,
    responceText : state.responceText
  }
}

const mapDispatchToProps=(dispatch)=>{

  return{
    userLogin : (user, password)=>{
      $.ajax({
        method : "POST",
        url : "api/users/login",
        data : {user, password},
        success : (data)=>{
          return dispatch({
            type : "LOGIN",
            payload : {logged : true, user : data.user, role:data.role, responceText : "Succefully Logged in", alertErrorLogged : false}
          })
        },
        error : (err)=>{
          return dispatch({
            type : "LOGIN",
            payload : {logged : false, responceText : err.responseText, user : "", role : "", alertErrorLogged : true }
          })
        }// end of error
      })//end of ajax
    }//end of userLogin
  }//end of return
}


export default  connect(mapStateToProps,mapDispatchToProps)(CurLogin);