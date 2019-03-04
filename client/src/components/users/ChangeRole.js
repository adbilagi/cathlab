import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"



export default class ChangeRole extends Component {
  state ={

    oldRole : '',//this state is for asigning,
    changeUser : "", // user whoose role has be changed
    newRole : "",
    allRoles : [],
    allUsers : [],
    // old role
    errorGettingOldRole : false,
    successGettingOldRole : false,
    oldRoleSuccessMessage : "",
    oldRoleErrorMessage: "",
    // new role
    errorGettingNewRole : false,
    successGettingNewRole : false,
    newRoleSuccessMessage : "",
    newRoleErrorMessage: "",

    

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

setRole=(e)=>{
  this.setState({
    newRole : e.target.value,
    errorGettingOldRole : false,
    successGettingOldRole : false,
    oldRoleSuccessMessage : "",
    oldRoleErrorMessage: ""
  });

}
getUserRole = (e)=>{
  // this method gets the role of the user
  let role ='';
  this.state.allUsers.forEach((user)=>{
    if(user.user === this.state.changeUser){
      role=user.role;
    }
  })

  if(role){
    this.setState({
      errorGettingOldRole : false,
      successGettingOldRole : true,
      oldRoleSuccessMessage : role,
      oldRoleErrorMessage: ""
    });
  }else{
    this.setState({
      errorGettingOldRole : true,
      successGettingOldRole : false,
      oldRoleSuccessMessage : "",
      oldRoleErrorMessage: "Undindentified User"
    });
  }

}
componentWillMount(){
    $.ajax({
      url : "api/users/getallusersandroles",
      method : "GET",
      success : (data)=>{
        this.setState({
          allRoles : data.roles,
          allUsers: data.users
        })
         
      },
      error : (err)=>{
        this.setState({
          roles : [],
          users : []
        })
      }
    })
}

submitForm=(e)=>{
  e.preventDefault();
  // code for submiting form
  let user = this.state.changeUser;
  let newRole = this.state.newRole;
  $.ajax({
    method : "PUT",
    url : "api/users/changerole",
    data : {user : user, role : newRole},
    success : (data)=>{
      // write code of success
      this.setState({
        errorGettingNewRole : false,
        successGettingNewRole : true,
        newRoleSuccessMessage : data,
        newRoleErrorMessage: "",
      })
    },
    error : (err)=>{
      // write code error
      this.setState({
        errorGettingNewRole : true,
        successGettingNewRole : false,
        newRoleSuccessMessage : "",
        newRoleErrorMessage: err.responseText,
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
                          <Input type="text" name="user" id="user" placeholder="User Name" list="curUserDataList" onChange={this.setUser} onBlur= {this.getUserRole}/>
                        </FormGroup>
                        <datalist id="curUserDataList" name="curUserDataList">
                          {   this.state.allUsers.map((user, index)=>{
                                    return <option key={index} value={user.user}></option>
                              })
                          }
                        </datalist>
                        <Alerts 
                            alertSuccess = {this.state.successGettingOldRole}
                            alertError = {this.state.errorGettingOldRole}
                            alertSuccessMessage = {this.state.oldRoleSuccessMessage}
                            alertErrorMessage = {this.state.oldRoleErrorMessage}
                        />
                        <FormGroup>
                          <Label for="Role">Role</Label>
                          <Input type="text" name="role" id="role" list="curRoleDataList" placeholder="New Role" onChange={this.setRole}/>
                        </FormGroup>
                        <datalist id="curRoleDataList" name="curRoleDataList">
                            {
                                this.state.allRoles.map((role, index)=>{
                                  return <option key={index} value={role}></option>
                                })
                            }

                        </datalist>
                        <Button color= "info">Change Role</Button>

                    </Form>
                    <br/>
                    <Alerts 
                      alertSuccess = {this.state.successGettingNewRole}
                      alertError = {this.state.errorGettingNewRole}
                      alertSuccessMessage = {this.state.newRoleSuccessMessage}
                      alertErrorMessage = {this.state.newRoleErrorMessage}
                    />
                          
                    
                  </Col>
              </Row>
          </Container>
        
      </div>
    )
  }
}
