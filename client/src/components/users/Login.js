import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert, Spinner} from 'reactstrap';
import {Redirect} from "react-router-dom"
import $ from "jquery";

class CurLogin extends Component {
  state = {
    user : "",
    password : "",
    logged : false,
    alertErrorLogged : false,
    responceText : "",
    spinner : false

  }

  onChange = (e)=>{
    this.setState({
      [e.target.name]  : e.target.value
    })

  }

  onSubmit =(e)=>{
    e.preventDefault();
    $.ajax({
      method : "POST",
      url : "api/users/login",
      beforeSend : ()=>{
        this.setState({
          spinner : true
        })
      },
      data : {user :this.state.user, password : this.state.password},
      success : (data)=>{
        sessionStorage.setItem("logged", true);
        sessionStorage.setItem("user", data.user);
        sessionStorage.setItem("role", data.role)
        this.setState({
          logged : true,
          alertErrorLogged : false,
          responceText : ""
        });

      },
      error : (err)=>{
        sessionStorage.setItem("logged", false);
        sessionStorage.setItem("user", "");
        sessionStorage.setItem("role", "")
        this.setState({
          logged : false,
          alertErrorLogged : true,
          responceText : err.responseText
        });
      },
      complete:()=>{
        this.setState({
          spinner : false
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
                      <h3>Login</h3>
                      <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}/>
                        </FormGroup>
                        <Row>
                          <Col>
                            <Button color="info" >Login</Button>{' '}
                          </Col>
                          <Col>
                            {this.state.spinner ? <Spinner color="info"/> : ""}
                          </Col>
                        </Row>
                      </Form>
                        <br />
                        {this.state.alertErrorLogged ?  <Alert color="danger">{this.state.responceText}</Alert> : ""}
                        {this.state.logged ? <Redirect  to="/"/>: ""}
                  </Col>
                </Row>

              </Container>        
            </div>
    )
  }
}


export default  CurLogin;