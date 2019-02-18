import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';

import {AppContext} from "../commons/context"

export default class CurLogin extends Component {

  render() {
    return (
      <AppContext.Consumer>
        {
          (c)=>{
            return (<div>
              <Container>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                      <h3>Login</h3>
                      <Form onSubmit={c.userLogin}>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={c.setUser}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input type="password" name="password" id="password" placeholder="Password" onChange={c.setPassword}/>
                        </FormGroup>
                        <Button color="info" >Login</Button>{' '}
                      </Form>
                  </Col>
                </Row>
              </Container>        
            </div>);
          }
        }
      </AppContext.Consumer>
    )
  }
}
