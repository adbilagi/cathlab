import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"

export default class SetActivityUser extends Component {
    state={
        user:"",
        allUsers : [],
        // user text box
        alertSuccessUserActive : false,
        alertSuccessUserActiveMessage : "",
        alertErrorUserActive : false,
        alertErrorUserActiveMessage: "",
        // actvity ajax 
        ajaxSuccessUserActive : false,
        ajaxSuccessUserActiveMessage : "",
        ajaxErrorUserActive : false,
        ajaxErrorUserActiveMessage: "",

    }

    activateUser=(activity)=>{
        this.getUserActivityStatus(this.state.user);
        if(this.state.alertSuccessUserActive){
            
            $.ajax({
                method : "PUT",
                url : "api/users/changeuseractivity",
                data : {user : this.state.user, activeUser : activity},
                success : (data)=>{
                    // write code for success
                    this.setState({
                        ajaxSuccessUserActive : true,
                        ajaxSuccessUserActiveMessage : data.message,
                        ajaxErrorUserActive : false,
                        ajaxErrorUserActiveMessage: "",
                    })
                },
                error : (err)=>{
                    // write code error
                    this.setState({
                        ajaxSuccessUserActive : false,
                        ajaxSuccessUserActiveMessage : "",
                        ajaxErrorUserActive : true,
                        ajaxErrorUserActiveMessage: err.responseText,
                    })
                }
            })
        }
        

    }

    onBlur=(e)=>{
        
        this.getUserActivityStatus(e.target.value);
    }


    onChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value,
            alertSuccessUserActive : false,
            alertSuccessUserActiveMessage : "",
            alertErrorUserActive : false,
            alertErrorUserActiveMessage: "",
            // actvity ajax 
            ajaxSuccessUserActive : false,
            ajaxSuccessUserActiveMessage : "",
            ajaxErrorUserActive : false,
            ajaxErrorUserActiveMessage: "",
        })
    }

    getUserActivityStatus = (user)=>{
        let curUser = user;
        let curUserUserActivity=false;
        let foundUser = false;
        this.state.allUsers.forEach((user)=>{
            if(user.user === curUser){
                foundUser=true;
                curUserUserActivity=user.activeUser;
            }
        });
        if(foundUser){
            this.setState({
                alertSuccessUserActive : true,
                alertSuccessUserActiveMessage : `User Activity is ${curUserUserActivity}`,
                alertErrorUserActive : false,
                alertErrorUserActiveMessage: ""

            });

        }else{
            this.setState({
                alertSuccessUserActive : false,
                alertSuccessUserActiveMessage : "",
                alertErrorUserActive : true,
                alertErrorUserActiveMessage: `Unidentified User`

            });

        }
    }

    componentWillMount(){
        $.ajax({
            method : "GET",
            url : "api/users/getallusersandroles",
            success : (data)=>{
            
                this.setState({
                    allUsers : data.users,
                })
            },
            error : (err)=>{
                this.setState({
                    allUsers:[]
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
                    <h3>Set Activity User</h3>
                    <Form >
                        <FormGroup>
                            <Label for="user"/>
                            <Input type="Text" name="user" id='name' list="allUsers" autocomplete="off" onChange={this.onChange} onBlur={this.onBlur}/>
                        </FormGroup>

                        <datalist name="allUsers" id="allUsers">
                        {
                            this.state.allUsers.map((user, index)=>{
                                return (<option key={index} value={user.user}></option>)
                            })
                        }
                        </datalist>
                        <Alerts 
                            alertSuccess = {this.state.alertSuccessUserActive}
                            alertError = {this.state.alertErrorUserActive}
                            alertSuccessMessage = {this.state.alertSuccessUserActiveMessage}
                            alertErrorMessage = {this.state.alertErrorUserActiveMessage}
                        />
                        <FormGroup>
                            <Row>                           
                                <Col>
                                    <Button color="success" onClick={()=>this.activateUser(true)}>Activate user</Button>
                                </Col>
                                <Col>
                                    <Button color="danger" onClick={()=>this.activateUser(false)}>InActivate user</Button>
                                </Col>                 
                            </Row>
                            
                        </FormGroup>
                    </Form>
                    <Alerts 
                        alertSuccess = {this.state.ajaxSuccessUserActive}
                        alertError = {this.state.ajaxErrorUserActive}
                        alertSuccessMessage = {this.state.ajaxSuccessUserActiveMessage}
                        alertErrorMessage = {this.state.ajaxErrorUserActiveMessage}
                    />
                  </Col>
              </Row>
          </Container>

      </div>
    )
  }
}
