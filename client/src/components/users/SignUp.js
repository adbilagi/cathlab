import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"

export default class SignUp extends Component {
state={
    user :"",
    email : "",
    password : "",
    confirmPassword : "",
    phone : "",
    address : "",
    panNumber : "",
    gstNumber : "",

    ajaxSuccess : false,
    ajaxError : false,
    errUnequalPassword : false
    // dateOfCreation : Date()
}

setUser = (e)=>{
  this.setState({
    user : e.target.value,
    ajaxError:false,
    ajaxSuccess : false
    
  });
}

setEmail = (e)=>{
  this.setState({
    email : e.target.value,
    ajaxError:false,
    ajaxSuccess : false
    
  })
}

setPassword = (e)=>{
  this.setState({
    password : e.target.value,
    errUnequalPassword : false,
    ajaxError:false,
    ajaxErrorMessage : "",
    ajaxSuccessMessage : "",
    ajaxSuccess : false
    
  });
}

setConfirmPassword = (e)=>{
  this.setState({
    confirmPassword : e.target.value,
    errUnequalPassword : false,
    ajaxError:false,
    ajaxSuccess : false
    
  });
}

setPhone = (e)=>{
  this.setState({
    phone : e.target.value,
    ajaxError:false,
    ajaxSuccess : false
    
  });
}

submitForm =(e)=>{
  e.preventDefault();
  this.setState({
    ajaxError:false,
    ajaxSuccess : false
  })

  try {
    let body = {
      user : this.state.user,
      email : this.state.email,
      password : this.state.password,
      confirmPassword : this.state.confirmPassword,
      phone : this.state.phone,
      address : this.state.address,
      panNumber : this.state.panNumber,
      gstNumber : this.state.gstNumber
    };
  
// check for valid password and confirm password
    if(body.password !== body.confirmPassword){
      this.setState({
        errUnequalPassword : true
      });
      return;
     
    }
    // ajax
    $.ajax({
      method : "POST",
      url : "/api/users/signup",
      data : body,
      success : (data)=>{
        this.setState({
          ajaxSuccess: true,
          ajaxSuccessMessage : data
        })
      },//end of success function
      error : (er)=>{
        this.setState({
          ajaxError : true,
          ajaxErrorMessage : er.responseText
        })
      }//end of error function
    })//end of ajax
  
    
  } catch (error) {
    alert(error);//alert error message
    
  }
  
}
  render() {
    return (
      <div>
          <Container>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h3>Sign Up </h3>
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" autoComplete="off" placeholder="User Name" onChange={this.setUser}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input type="text" name="email" id="email" autoComplete="off" placeholder="email" onChange={this.setEmail}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" autoComplete="off" placeholder="Password" onChange={this.setPassword}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="confirmPassword">ConfirmPassword</Label>
                          <Input type="password" name="confirmPassword" autoComplete="off" id="confirmPassword" placeholder="Confirm Password" onChange={this.setConfirmPassword}/>
                        </FormGroup>

                        <Alerts 
                            alertError = {this.state.errUnequalPassword}
                            alertErrorMessage = "New password and confirm password are unidentical"
                        />
                        <FormGroup>
                          <Label for="phone">Phone</Label>
                          <Input type="text" name="phone" id="phone" placeholder="phone" autoComplete="off" onChange={this.setPhone}/>
                        </FormGroup>
                        <Button color="info">Sign Up</Button>
                    </Form>
                    <br/>
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
