import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Spinner} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"

export default class DeleteGroup extends Component {
    state ={
        name : "",
        underGroup : "",
        groupList : [],
        ajaxError : false,
        ajaxErrorMessage : "",
        ajaxSuccess : false,
        ajaxSuccessMessage :"",
        spinner : false
      }
      onChange =(e)=>{
          this.setState({
              [e.target.name] : e.target.value,
              ajaxError : false,
              ajaxErrorMessage : "",
              ajaxSuccess : false,
              ajaxSuccessMessage :""
          })
      }
      componentWillMount(){
        $.ajax({
          method : "GET",
          beforeSend : this.setState({spinner : true}),
          url : "api/master/accounts/group/all",
          success: (data)=>{
            let tempGroup = [];
            data.data.forEach((element)=>{
              tempGroup.push(element.name);
            });

            this.setState({
              groupList : tempGroup,
            })
          },
          error : (err)=>{
            console.log(err.responseText);
          },
          complete : ()=>{
            this.setState({spinner : false})
          }
        })
      }
      onSubmit =(e)=>{
        e.preventDefault();
        try {
          if(this.state.groupList.indexOf(this.state.name) < 0){
            this.setState({
              ajaxError : true,
              ajaxErrorMessage : "invalid group name",
              ajaxSuccess : false,
              ajaxSuccessMessage : ""

            })
            return;

          }
          $.ajax({
            method : "DELETE",
            url : "/api/master/accounts/group",
            data : {name : this.state.name},
            beforeSend : this.setState({spinner : true}),
            success : (data)=>{
              this.setState({
                ajaxError : false,
                ajaxErrorMessage : "",
                ajaxSuccess : true,
                ajaxSuccessMessage :data.message

              })
            },
            error : (err)=>{
              this.setState({
                ajaxError : true,
                ajaxErrorMessage : err.responseText,
                ajaxSuccess : false,
                ajaxSuccessMessage :"",
              
              })
            },
            complete : ()=>{
              this.setState({spinner : false})
            }
          })
          
        } catch (error) {
          this.setState({
            ajaxError : true,
            ajaxErrorMessage : error,
            ajaxSuccess : false,
            ajaxSuccessMessage :"",
            spinner : false
          })
          
        }
      }
  render() {
    return (
      <div>
        <Container>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <h3>Delete Group</h3>
                    <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" autoComplete="off" placeholder="Enter group name" list="groupList" onChange={this.onChange}/>
                        </FormGroup>
                        <datalist id="groupList" name="groupList">
                          {
                            this.state.groupList.map((group , index)=>{
                              return(
                                <option key = {index} value={group}/>
                              )
                            })
                          }
 
  
                        </datalist>
                        <Row>
                          <Col>
                            <Button color="info">Delete Group</Button>
                          </Col>
                            {this.state.spinner ? <Spinner color="info" /> : ""}
                          <Col>
                          </Col>
                        </Row>
                        
                    </Form>
                    <br/>
                    {/* <Alerts 
                            alertSuccess = {this.state.ajaxSuccess}
                            alertError = {this.state.ajaxError}
                            alertSuccessMessage = {this.state.ajaxSuccessMessage}
                            alertErrorMessage = {this.state.ajaxErrorMessage}
                        /> */}
                </Col>
            </Row>
        </Container>
        
      </div>
    )
  }
}
