import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";



export default class ChangeRole extends Component {
  state ={
    roles:[]
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
                          <Input type="text" name="user" id="user" placeholder="User Name" onChange={this.setUser}/>
                        </FormGroup>
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
