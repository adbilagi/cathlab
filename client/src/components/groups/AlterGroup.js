import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"


export default class AlterGroup extends Component {
    state ={
        oldname : "",
        newName : "",
        undergroup : "",
        groupList : ["Captal Account", "Assets", "Liabilities"]
      }
      onChange =(e)=>{
        this.setState({
          [e.target.name] : e.target.value
        });
      }
  render() {
    return (
      <div>
          <Container>
              <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={this.onSubmit}>
                        <datalist id="groupList" name="groupList">
                          {
                            this.state.groupList.map((group , index)=>{
                              return(
                                <option key = {index} value={group}/>
                              )
                            })
                          }
                        </datalist>
                        <FormGroup>
                            <Label for="oldName">Name</Label>
                            <Input type="text" name="oldName" id="oldName" list="groupList" autoComplete="off" placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="newName">Name</Label>
                            <Input type="text" name="newName" id="newName" autoComplete="off" placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="oldName">Name</Label>
                            <Input type="text" name="oldName" id="oldName" list="groupList" autoComplete="off" placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="undergroup">Under Group</Label>
                            <Input type="text" name="undergroup" id="undergroup" autoComplete="off" list="groupList" placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>
                          <Button color="info">Alter Group</Button>
                    </Form>
                  </Col>
              </Row>
          </Container>
        
      </div>
    )
  }
}
