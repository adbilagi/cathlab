import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert} from 'reactstrap';
import $ from "jquery";
import {connect} from "react-redux";

export default class CurLogin extends Component {
  state = {
    user : "",
    password : ""
  }

  setUser = (e)=>{
    this.setState({
      user  : e.target.value
    })

  }

  setPassword =(e)=>{
    this.setState({
      password : e.target.value
    })
  }

  userLogin = (e)=>{
    e.preventDefauld();
    $.ajax({
      method : "POST",
      url : "api/users/login",
      data : {user : this.state.user, password: this.state.password},
      success : (data)=>{
        mapDispachToProps()
      }
    })

  }




  render() {
    return (
            <div>
              <Container>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <h3>Login</h3>
                      <Form onSubmit={this.userLogin}>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.setUser}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.setPassword}/>
                        </FormGroup>
                        <Button color="info" >Login</Button>{' '}
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
    onSuccessLogin : ()=>dispach({type : 'LOGIN'}),
    onErrorLogin : ()=>dispach ({type : 'LOGOUT'})

  }
}
