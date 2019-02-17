import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';

import {AppContext} from "../commons/context"

export default class CurLogin extends Component {
  // state={
  //   user : "",
  //   password : ""
  // }

  // setUser=(e)=>{
  //   this.setState({
  //     user : e.target.value
  //   });
  // }

  // setPassword = (e)=>{
  //   this.setState({
  //     password : e.target.value
  //   });
  // }

  // userLogin =(e)=>{
  //   e.preventDefault();
  //   // write code to server /login (post) route
  //   let body ={"user" : this.state.user, "password" : this.state.password};
  //   $.ajax({
  //     method : "POST",
  //     url : "/login",
  //     data : body,
  //   }).done((data)=>{
  //     console.log(data);
  //   }).catch((er)=>{
  //     console.log(er.responseText);
  //   })
     
  // }
  render() {
    return (
      <AppContext.Consumer>
        {
          (c)=>{
            return <div>
              <Container>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <h3>Login</h3>
                      <Form action="/login" method="post">
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={c.setUser}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={c.setPassword}/>
                        </FormGroup>
                        <Button color="info" onClick={c.userLogin}>Login</Button>{' '}
                      </Form>
                  </Col>
                </Row>
              </Container>        
            </div>
          }
        }
      </AppContext.Consumer>
    )
  }
}
