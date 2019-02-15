import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
    fetch("/login", {
      method : "POST",
      body : JSON.stringify({user : this.state.user, password : this.state.password}),
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },credentials : "include",

    }).then((res)=>{
      return res;
    }).then((data)=>{
      console.log(data);
    }).catch((er)=>{
      console.log(er);
    })

  }

  userCancel =(e)=>{
    e.preventDefault();
    // write code to close login foem
  }


  render() {

    return (
      <div>
          <Form action="/login" method="post">
          <FormGroup>
            <Label for="user">User Name</Label>
            <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.setUser}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" onChange={this.setPassword}/>
          </FormGroup>
          <Button>Login</Button>{' '}
          <Button color="info" onClick={this.userCancel}>Cancel</Button>{' '}
          </Form>

        
      </div>
    )
  }
}
