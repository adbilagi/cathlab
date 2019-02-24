import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"



export default class ChangeRole extends Component {
  state ={
    roles:[],// array of all roles in server
    oldRole : '',//this state is for asigning,
    changeUser : "", // user whoose role has be changed
    newRole : "",
    errorGettingOldRole : false,
    successGettingOldRole : false,
    oldRoleSuccessMessage : "",
    oldRoleErrorMessage: ""

  }
setUser = (e)=>{
  this.setState({
    changeUser : e.target.value,
    errorGettingOldRole : false,
    successGettingOldRole : false,
    oldRoleSuccessMessage : "",
    oldRoleErrorMessage: ""
  });

}
getUserRole = (e)=>{
  // this method gets the role of the user

  $.ajax({
    method : "POST",
    url : "api/users/userrole",
    data : {user : this.state.changeUser},
    success : (data)=>{
      
      this.setState({
        oldRole : data.role,
        successGettingOldRole : true
      })
    },
    error : (err)=>{
      this.setState({
        oldRole : "",
        errorGettingOldRole : true,
        oldRoleErrorMessage : err.responseText
      })
    }
  })

}
componentDidMount(){
    $.ajax({
      url : "api/users/allroles",
      method : "GET",
      success : (data)=>{
        
        console.log(data);
        this.setState({
          roles : data.roles
        });
      },
      error : (err)=>{
        this.setState({
          roles : []
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
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                          <Label for="user">User Name</Label>
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.setUser} onBlur= {this.getUserRole}/>
                        </FormGroup>
                        <Alerts 
                            alertSuccess = {this.state.successGettingOldRole}
                            alertError = {this.state.errorGettingOldRole}
                            alertSuccessMessage = {this.state.oldRole}
                            alertErrorMessage = {this.state.oldRoleErrorMessage}
                        />
                        <FormGroup>
                          <Label for="Role">Role</Label>
                          <Input type="text" name="role" id="role" list="curDataList" placeholder="User Name" onChange={this.setUser}/>
                        </FormGroup>
                        <datalist id="curDataList" name="curDataList">
                            {
                                this.state.roles.map((role, index)=>{
                                  return <option key={index} value={role}></option>
                                })
                            }

                        </datalist>
                    </Form>
                    <Button color= "info">Change Role</Button>
                  </Col>
              </Row>
          </Container>
        
      </div>
    )
  }
}
