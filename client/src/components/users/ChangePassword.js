import React, { Component } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from  "../commons/Alerts"

export default class ChangePassword extends Component {
    state ={
        oldPassword : "",
        newPassword : "",
        confirmPassword : "",
        errUnequalPassword : false,
        ajaxSuccess : false,
        ajaxError : false,
        ajaxSuccessMessage : "",
        ajaxErrorMessage : ""
    }

    setOldPassword=(e)=>{
        this.setState({
            oldPassword : e.target.value,
            ajaxSuccess : false,
            ajaxError : false,
            ajaxSuccessMessage : "",
            ajaxErrorMessage : ""
        })
    }
    setNewPassword =(e)=>{
        this.setState({
            newPassword : e.target.value,
            errUnequalPassword : false,
            ajaxSuccess : false,
            ajaxError : false,
            ajaxSuccessMessage : "",
            ajaxErrorMessage : ""
        })
    }
    setConfirmPassword=(e)=>{
        this.setState({
            confirmPassword : e.target.value,
            errUnequalPassword : false,
            ajaxSuccess : false,
            ajaxError : false,
            ajaxSuccessMessage : "",
            ajaxErrorMessage : ""
        })
    }
    submitForm=(e)=>{
        e.preventDefault();
        this.setState({
            errUnequalPassword : false,
            ajaxSuccess : false,
            ajaxError : false,
            ajaxSuccessMessage : "",
            ajaxErrorMessage : ""

        });
       
        if(this.state.newPassword !== this.state.confirmPassword){
            this.setState({
                errUnequalPassword : true
            })
            return;
        }

        $.ajax({
            url : "/api/users/changepassword",
            method : "PUT",
            data : {oldPassword : this.state.oldPassword, newPassword : this.state.newPassword},
            success : (data)=>{
                this.setState({
                    ajaxSuccess : true,
                    ajaxSuccessMessage : data
                });
            },
            error : (err)=>{
                this.setState({
                    ajaxError : true,
                    ajaxErrorMessage : err.responseText
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
                  <h3>Change Password</h3>
                    <Form onSubmit={this.submitForm}>
                        <FormGroup>
                          <Label for="oldPassword">Old Password</Label>
                          <Input type="password" name="oldPassword" id="oldPassword" placeholder="Old Password" onChange={this.setOldPassword}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="newPassword">New Password</Label>
                          <Input type="password" name="newPassword" id="newPassword" placeholder="New Password" onChange={this.setNewPassword}/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="confirmPassword">Confirm Password</Label>
                          <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={this.setConfirmPassword}/>
                        </FormGroup>
                        <br/>
                        <Alerts 
                            alertError = {this.state.errUnequalPassword}
                            alertErrorMessage = "New password and confirm password are unidentical"
                        />
                        <Button color="info">Change Password</Button>
                    </Form>
                    <br/>

                    <Alerts 
                        alertSuccess = {this.state.ajaxSuccess}
                        alertError = {this.state.ajaxError}
                        alertSuccessMessage = {this.state.ajaxSuccessMessage}
                        alertErrorMessage = {this.state.ajaxErrorMessage}
                    />
                  </Col>
              </Row>
          </Container>
        
      </div>
    )
  }
}
