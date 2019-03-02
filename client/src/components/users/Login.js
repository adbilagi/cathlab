import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert} from 'reactstrap';
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
                      <Form >
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}/>
                        </FormGroup>
                        <Button color="info" onClick={()=> this.props.userLogin(this.state.user, this.state.password)}>Login</Button>{' '}
                      </Form>
                        <br />
                      
                  </Col>
                </Row>

              </Container>        
            </div>
    )
  }
}


const mapStateToProps= (state)=>{
  return{
    logged : state.logged
  }
}

const mapDispachToProps=(dispach)=>{

 return{
   userLogin : (user, password)=>{
     $.ajax({
       method : "POST",
       url : "api/users/login",
       data : {user, password},
       success : (data)=>{
         return dispach({
           type : "LOGIN",
           payload : true
         })
       },//end of success
       error : (arr)=>{
         return dispach({
           type : "LOGIN",
           payload : false
         })
       }//end of error
     })//end of ajax
   },//end of userLogin

 }
}


export default  connect(mapStateToProps,mapDispachToProps)(CurLogin);