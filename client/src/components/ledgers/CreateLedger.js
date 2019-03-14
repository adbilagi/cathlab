/**
 * This file is for creating ledger
 */

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col} from 'reactstrap';
import LedgerElements from "./LedgerElements"
import $ from "jquery";
import Alerts from "../commons/Alerts"
 
 export default class CreateLedger extends Component {
     state={
         name : "",
         groupList : [],
         groupName :"",
         email : "",
         phone : "",
         panNumber :"",
         gstNumber : "",
         address : "",
         openingBalance : ""
      }

      onChange =(e)=>{
        this.setState({
          [e.target.name] : e.target.value
        })
      }

   render() {
     return (
       <div>
           <Container>
               <Row>
               <Col sm="12">
                    <h3>Create Ledger</h3>
                        <Form onSubmit={this.onSubmit}>
                        <LedgerElements 
                                 name = {this.onChange}
                                 nameValue = {this.state.name}

                                 groupName ={this.onChange}
                                 groupNameValue= {this.state.groupName}

                                 email = {this.onChange}
                                 emailValue = {this.state.email}

                                 phone = {this.onChange}
                                 phoneValue = {this.state.phone}

                                 panNumber = {this.onChange}
                                 panNumberValue = {this.state.panNumber}

                                 gstNumber = {this.onChange}
                                 gstNumberValue = {this.state.gstNumber}

                                 address = {this.onChange}
                                 addressValue ={this.state.address}

                                 openingBalance ={this.onChange}
                                 openingBalanceValue = {this.state.openingBalance}
                        
                        />
                         <Button color="info">Create New Ledger</Button>
                        </Form>
                   </Col>
               </Row>
           </Container>
         
       </div>
     )
   }
 }
	
	
	
