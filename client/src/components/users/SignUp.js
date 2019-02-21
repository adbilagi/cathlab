import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert} from 'reactstrap';
import $ from "jquery";

export default class SignUp extends Component {
state={
    user :"",
    email : "",
    password : "",
    confirmPassword : "",
    phone : "",
    address : "",
    ajaxSuccess : false,
    ajaxError : false,
    errPassword : false
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
    errPassword : false,
    ajaxError:false,
    ajaxSuccess : false
    
  });
}

setConfirmPassword = (e)=>{
  this.setState({
    confirmPassword : e.target.value,
    errPassword : false,
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

  try {
    let body = {
      user : this.state.user,
      email : this.state.email,
      password : this.state.password,
      confirmPassword : this.state.confirmPassword,
      phone : this.state.phone
    };
  
// check for valid password and confirm password
    if(body.password !== body.confirmPassword){
      this.setState({
        errPassword : true
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
          ajaxSuccess: false
        })
      },//end of success function
      error : (er)=>{
        this.setState({
          ajaxError : true
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
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.setUser}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input type="text" name="email" id="email" placeholder="email" onChange={this.setEmail}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.setPassword}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="confirmPassword">ConfirmPassword</Label>
                          <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={this.setConfirmPassword}/>
                        </FormGroup>
                        {this.state.errPassword ? <Alert color="danger">Identical Password and Confirm Password needed</Alert>:""}
                        <FormGroup>
                          <Label for="phone">Phone</Label>
                          <Input type="text" name="phone" id="phone" placeholder="phone" onChange={this.setPhone}/>
                        </FormGroup>
                        <Button color="info">Sign Up</Button>
                    </Form>
                    <br />
                        {this.state.ajaxSuccess? <Alert color="success">Created new user successfully</Alert>: ""}
                        {this.state.ajaxError ? <Alert color="danger">Invalid Signup</Alert>: ""}
                </Col>
              </Row>
          </Container>
        
      </div>
    )
  }
}
