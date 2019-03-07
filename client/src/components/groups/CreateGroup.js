import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"

export default class CreateGroup extends Component {
  state ={
    name : "",
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
                    <h3>Create Group</h3>
                    <Form onSubmit={this.onSubmit}>                    
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" autoComplete="off" placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="undergroup">Under Group</Label>
                            <Input type="text" name="undergroup" id="undergroup" autoComplete="off" list="groupList" placeholder="Enter group name" onChange={this.onChange}/>
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
                        <Button color="info">Create Group</Button>
                    </Form>
                </Col>

              </Row>
          </Container>
        
      </div>
    )
  }
}
