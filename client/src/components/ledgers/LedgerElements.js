import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import $ from "jquery";

export default class LedgerElements extends Component {
    state={
        groupList : []
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
           data.parentGroup.forEach((element)=>{
             tempGroup.push(element);
           })
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
      
           <Row>
            <Col sm="12" lg="6">
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" value="JK" name="name" id="name" autoComplete="off" placeholder="Enter new ledger name" onChange={this.props.name}/>
                </FormGroup>
                <FormGroup>
                    <Label for="groupName">Group Name</Label>
                    <Input type="text" name="groupName" id="groupName" autoComplete="off" placeholder="Enter Group name" list= "groupList" onChange={this.props.groupName}/>                   
                </FormGroup>
                <datalist id="groupList" name="groupList">
                    {
                        this.state.groupList.map((group, index)=>{
                            return (<option key={index} value={group}/>)
                        })
                    }
                </datalist>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" placeholder="Enter email"autoComplete="off"  onChange={this.props.email}/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" placeholder="Enter Phone" autoComplete="off" onChange={this.props.phone}/>
                </FormGroup>
            </Col>
            <Col sm="12" lg="6">
                <FormGroup>
                    <Label for="panNumber">PAN Number</Label>
                    <Input type="text" name= "panNumber" id="panNumber" autoComplete="off" placeholder="Enter PAN card number" onChange={this.props.panNumber}/>
                </FormGroup>

                <FormGroup>
                    <Label for="gstNumber">GST Number</Label>
                    <Input type="text" name="gstNumber" id="gstNumber" autoComplete="off" placeholder="Enter GST Number" onChange={this.props.gstNumber}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="textarea" name="address" id="address" placeholder="Enter address" onChange={this.props.address}/>
                </FormGroup>
                <FormGroup>
                    <Label for="openingBalance">Opening Balance</Label>
                    <Input type="text" name="openingBalance" id="openingBalance" autoComplete="off" placeholder ="Enter opening balance with Cr or Dr suffix" onChange={this.props.openingBalance}/>
                </FormGroup>
            </Col>
        </Row>
      
    )
  }
}
