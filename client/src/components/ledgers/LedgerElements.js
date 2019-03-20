import React, { Component } from 'react';
import {  FormGroup, Label, Input,  Row, Col} from 'reactstrap';

export default class LedgerElements extends Component {
  render() {
    return (
      
           <Row>
            <Col sm="12" lg="6">
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" value={this.props.nameValue} name="name" id="name" autoComplete="off" placeholder="Enter new ledger name" onChange={this.props.name}/>
                </FormGroup>
                <FormGroup>
                    <Label for="groupName">Group Name</Label>
                    <Input type="text" value={this.props.groupNameValue} name="groupName" id="groupName" autoComplete="off" placeholder="Enter Group name" list= "groupList" onChange={this.props.groupName} onBlur={this.props.onBlur} />                   
                </FormGroup>
                <datalist id="groupList" name="groupList">
                    {
                        this.props.groupList.map((group, index)=>{
                            return (<option key={group._id} value={group.name}/>)
                        })
                    }
                </datalist>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" value={this.props.emailValue} name="email" id="email" placeholder="Enter email"autoComplete="off"  onChange={this.props.email}/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" value={this.props.phoneValue} name="phone" id="phone" placeholder="Enter Phone" autoComplete="off" onChange={this.props.phone}/>
                </FormGroup>
            </Col>
            <Col sm="12" lg="6">
                <FormGroup>
                    <Label for="panNumber">PAN Number</Label>
                    <Input type="text" value={this.props.panNumberValue} name= "panNumber" id="panNumber" autoComplete="off" placeholder="Enter PAN card number" onChange={this.props.panNumber}/>
                </FormGroup>

                <FormGroup>
                    <Label for="gstNumber">GST Number</Label>
                    <Input type="text" value={this.props.gstNumberValue} name="gstNumber" id="gstNumber" autoComplete="off" placeholder="Enter GST Number" onChange={this.props.gstNumber}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="textarea" value={this.props.addressValue} name="address" id="address" placeholder="Enter address" onChange={this.props.address}/>
                </FormGroup>
                <FormGroup>
                    <Label for="openingBalance">Opening Balance</Label>
                    <Input type="text" value={this.props.openingBalanceValue} name="openingBalance" id="openingBalance" autoComplete="off" placeholder ="Enter opening balance with Cr or Dr suffix"  onChange={this.props.openingBalance}/>
                </FormGroup>
                <FormGroup check>
                <Label check>
                    <Input type="checkbox" name= "activeLedger" id="activeLedger"checked={this.props.activeLedger}/>{' '}
                    Active Ledger
                </Label>
                </FormGroup>
            </Col>
        </Row>
      
    )
  }
}
