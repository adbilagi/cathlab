/**
 * This file is for altering ledgers
 */

import React, { Component } from 'react';
import { Button, Form, Container, Row, Col, Spinner, FormGroup, Label, Input} from 'reactstrap';
import LedgerElements from "./LedgerElements"
import $ from "jquery";
import Alerts from "../commons/Alerts"
 
 export default class CreateLedger extends Component {
     state={
         getLedger : "",
         _id : "",
         name : "",
         groupkey :"",
         groupName :"",
         email : "",
         phone : "",
         panNumber :"",
         gstNumber : "",
         address : "",
         openingBalance : 0,
         activeLedger : false,
         groupList : [],
         ledgerList : [],
         ajaxError : false,
         ajaxErrorMessage : "",
         ajaxSuccess : false,
         ajaxSuccessMessage :"",
         ajaxGetLedgerError : false,
         ajaxGetLedgerErrorMessage : "",
         ajaxGetLedgerSuccess : false,
         ajaxGetLedgerSuccessMessage :"",
         spinnerLedger : false,
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

      onChangeActiveLedger =(e)=>{
        this.setState({
          activeLedger : !this.state.activeLedger
        })
      }

      getLedger =(e)=>{
        $.ajax({
            method : "GET",
            url : `/api/master/accounts/ledger/${this.state.getLedger}`,
            beforeSend : ()=>{
                this.setState({
                    ajaxGetLedgerError : false,
                    ajaxGetLedgerErrorMessage : "",
                    ajaxGetLedgerSuccess : false,
                    ajaxGetLedgerSuccessMessage :"",
                    spinnerLedger : true,
                })
            },
            success : (data)=>{
             
                this.setState({
                    _id : data.data._id,
                    name : data.data.name,
                    groupkey :data.data.groupKey,
                    email : data.data.email,
                    phone : data.data.phone,
                    panNumber :data.data.panNumber,
                    gstNumber : data.data.gstNumber,
                    address : data.data.address,
                    openingBalance : data.data.openingBalance,
                    activeLedger : data.data.activeLedger,

                    ajaxGetLedgerError : false,
                    ajaxGetLedgerErrorMessage : "",
                    ajaxGetLedgerSuccess : true,
                    ajaxGetLedgerSuccessMessage : data.message,
                   
                })
                
                this.state.groupList.forEach((group)=>{
                    if(group._id === this.state.groupkey){
                        this.setState({groupName : group.name})
                    }
                })
            },
            error : (err)=>{
                this.setState({
                    ajaxGetLedgerError : true,
                    ajaxGetLedgerErrorMessage : err.responseText,
                    ajaxGetLedgerSuccess : false,
                    ajaxGetLedgerSuccessMessage :""
                    
                });
                
            },
            complete : ()=>{
                this.setState({
                    spinnerLedger : false
                })
            }
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
          beforeSend : ()=>{
            this.setState({
              spinner : true
            })
          },
          success: (data)=>{
            this.setState({
              groupList : data.data,
            })
          },
          error : (err)=>{
            console.log(err.responseText);
          },
          complete : ()=>{
            this.setState({
              spinner : false
            })
          }
        })

        // get ledgers

        $.ajax({
          method:"GET",
          url : "/api/master/accounts/ledger/",
          beforeSend : ()=>{
            this.setState({
              spinner : true
            })
          },
          success : (data)=>{
            this.setState({
              ledgerList : data
            })
          },
          error : (er)=>{
            console.log(er.responseText)
          },
          complete : ()=>{
            this.setState({
              spinner : false
            })
          }
        })
      }


   render() {
     return (
       <div>
           <Container>
                <h3>Alter Ledger</h3>
                <Form onSubmit={this.getLedger}>
                    <Row >
     
                        <Col sm="12">
                        <FormGroup>
                            <Label for="getLedger">Get Ledger</Label>
                            <Input type="text" name="getLedger" id="getLedger" list="ledgerList" autoComplete="off" value={this.state.getLedger} onChange={this.onChange} placeholder="Enter Ledger Name"/>
                              <datalist name="ledgerList" id="ledgerList">
                              {
                                this.state.ledgerList.map((ledger, index)=>{
                                  return(<option key ={`ledger${index}`} value={ledger.name}></option>)
                                })
                              }
                              </datalist>
                            <br/>
                            <Button color="success" onClick={this.getLedger}>Get Ledger</Button>
                            {this.state.spinnerLedger ? <Spinner clor="info"/> : ""}

                            
                        </FormGroup>


                                                      
                        <Alerts
                                alertSuccess = {this.state.ajaxGetLedgerSuccess}
                                alertError = {this.state.ajaxGetLedgerError}
                                alertSuccessMessage = {this.state.ajaxGetLedgerSuccessMessage}
                                alertErrorMessage = {this.state.ajaxGetLedgerErrorMessage}
                            />
                        </Col>

 
                    </Row>
                </Form>
               <Row>
               <Col sm="12">
                    
                        <Form onSubmit={this.onSubmit}>
                        <hr/>
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
                          activeLedgerValue = {this.onChangeActiveLedger}
                
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
	