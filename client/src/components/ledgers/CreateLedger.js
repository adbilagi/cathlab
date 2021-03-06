/**
 * This file is for creating ledger
 */

import React, { Component } from 'react';
import { Button, Form, Container, Row, Col, Spinner} from 'reactstrap';
import LedgerElements from "./LedgerElements"
import $ from "jquery";
import Alerts from "../commons/Alerts"
 
 export default class CreateLedger extends Component {
     state={
         name : "",
         groupkey :"",
         groupName :"",
         email : "",
         phone : "",
         panNumber :"",
         gstNumber : "",
         address : "",
         openingBalance : 0,
         activeLedger : true,
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

      onSubmit =(e)=>{
        e.preventDefault();
        try {
          let key ="";
          this.state.groupList.forEach((group)=>{
            if(group.name === this.state.groupName){
              key = group._id
            }
          })
          let data = {
            name : this.state.name,
            groupName :this.state.groupName,
            groupKey :  key,
            email : this.state.email,
            phone : this.state.phone,
            panNumber : this.state.panNumber,
            gstNumber : this.state.gstNumber,
            address : this.state.address,
            openingBalance : this.state.openingBalance,
            activeLedger : this.state.activeLedger

          }
          this.setState({
            spinner : true
          })
          $.ajax({
            method : "POST",
            url : "/api/master/accounts/ledger",
            data :data,
            success : (data)=>{
              this.setState({
                ajaxError : false,
                ajaxErrorMessage : "",
                ajaxSuccess : true,
                ajaxSuccessMessage : data.message
              })

            },
            error : (err)=>{
              this.setState({
                ajaxError : true,
                ajaxErrorMessage : err.responseText,
                ajaxSuccess : false,
                ajaxSuccessMessage : ""
              })

            },
            complete : ()=>{
              this.setState({
                spinner : false
              })
            }
          })
        } catch (error) {
          this.setState({
            ajaxError : true,
            ajaxErrorMessage : error,
            ajaxSuccess : false,
            ajaxSuccessMessage : ""
          })

          
        }
        
      }
      componentWillMount(){
        $.ajax({
          method : "GET",
          url : "api/master/accounts/group/all",
          success: (data)=>{
            this.setState({
              groupList : data.data,
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
               <Col sm="12">
                    <h3>Create Ledger</h3>
                        <Form onSubmit={this.onSubmit}>
                        <LedgerElements
                          groupList = {this.state.groupList}
                          
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
                          activeLedger = {this.state.activeLedger}
                
                        />
                        <Row>
                          <Col>
                            <Button color="info">Create New Ledger</Button>
                          </Col>
                          <Col>
                          {this.state.spinner ? <Spinner color="info"/> : ""}
                          </Col>
                        </Row>
                         
                         
                        </Form>
                        <br/>
                        <Alerts
                            alertSuccess = {this.state.ajaxSuccess}
                            alertError = {this.state.ajaxError}
                            alertSuccessMessage = {this.state.ajaxSuccessMessage}
                            alertErrorMessage = {this.state.ajaxErrorMessage}
                        />
                   </Col>
               </Row>
           </Container>
         
       </div>
     )
   }
 }
	
	
	
