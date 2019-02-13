import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";

export default class CurLogin extends Component {
  state={
    user : "",
    password : ""
  }

  setUser=(e)=>{
    this.setState({
      user : e.target.value
    });
  }

  setPassword = (e)=>{
    this.setState({
      password : e.target.value
    });
  }

  userLogin =(e)=>{
    e.preventDefault();
    // write code to server /login (post) route
  axios.post('/login', {user : this.state.user, password : this.state.password})  
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  }

  userCancel =(e)=>{
    e.preventDefault();
    // write code to close login foem
  }


  render() {

    return (
      <div>
          <Form>
          <FormGroup>
            <Label for="user">User Name</Label>
            <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.setUser}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.setPassword}/>
          </FormGroup>
          <Button color="info" onClick={this.userLogin}>Login</Button>{' '}
          <Button color="info" onClick={this.userCancel}>Cancel</Button>{' '}
          </Form>

        
      </div>
    )
  }
}
