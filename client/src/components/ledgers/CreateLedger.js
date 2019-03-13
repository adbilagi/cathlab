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

   render() {
     return (
       <div>
           <Container>
               <Row>
               <Col sm="12">
                    <h3>Create Ledger</h3>
                        <Form onSubmit={this.onSubmit}>
                        <LedgerElements 
                                 name = {this.state.name}
                                 groupName ={this.state.groupName}
                                 email = {this.state.email}
                                 phone = {this.state.phone}
                                 panNumber = {this.state.panNumber}
                                 gstNumber = {this.state.gstNumber}
                                 address = {this.state.address}
                                 openingBalance ={this.state.openingBalance}
                        
                        />
                         
                        </Form>
                   </Col>
               </Row>
           </Container>
         
       </div>
     )
   }
 }
 