import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
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
        ajaxSuccessMessage :""
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
          }
        })
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
                        <Button color="info">Delete Group</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
        
      </div>
    )
  }
}
