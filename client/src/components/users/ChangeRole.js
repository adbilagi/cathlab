import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import Autosuggest  from "react-autosuggest";
import $ from "jquery";

export default class ChangeRole extends Component {
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
                            <Label for="role">
                                <Autosuggest/>
                            </Label>
                        </FormGroup>
                    </Form>
                  </Col>
              </Row>
          </Container>
        
      </div>
    )
  }
}
