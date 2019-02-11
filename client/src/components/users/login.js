import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class CurLogin extends Component {
  render() {
    return (
      <div>
          <form>
          <FormGroup>
            <Label for="user">Username</Label>
            <Input type="text" name="user" id="user" placeholder="User Name" />
          </FormGroup>
          </form>
        
      </div>
    )
  }
}
