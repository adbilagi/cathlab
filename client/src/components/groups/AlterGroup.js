import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Spinner} from 'reactstrap';
import $ from "jquery";
import Alerts from "../commons/Alerts"
import { isUndefined } from 'util';


export default class AlterGroup extends Component {
    state ={
        oldName : "",
        name : "",
        underGroup : "",
        groupList : [],
        oldGroupList : [],
        ajaxError : false,
        ajaxErrorMessage : "",
        ajaxSuccess : false,
        ajaxSuccessMessage :"",
        ajaxGetUnderGroupError : false,
        ajaxGetUnderGroupErrorMessage : "",
        ajaxGetUnderGroupSuccess : false,
        ajaxGetUnderGroupSuccessMessage :"",
        spinner : false
      }
      onChange =(e)=>{
        this.setState({
          [e.target.name] : e.target.value,
          ajaxError : false,
          ajaxErrorMessage : "",
          ajaxSuccess : false,
          ajaxSuccessMessage :"",
          ajaxGetUnderGroupError : false,
          ajaxGetUnderGroupErrorMessage : "",
          ajaxGetUnderGroupSuccess : false,
          ajaxGetUnderGroupSuccessMessage :"",
        });
      }


      onBlur = (e)=>{
        
       let underGroup= this.state.oldGroupList.find((group)=>{
         return group.name == e.target.value
       })
       if(isUndefined(underGroup)){
         this.setState({
          ajaxGetUnderGroupError : true,
          ajaxGetUnderGroupErrorMessage : "invalid group name",
          ajaxGetUnderGroupSuccess : false,
          ajaxGetUnderGroupSuccessMessage :"",
         })
          
       }else{
         this.setState({
           underGroup : underGroup.underGroup,
           ajaxGetUnderGroupError : false,
           ajaxGetUnderGroupErrorMessage : "",
           ajaxGetUnderGroupSuccess : true,
           ajaxGetUnderGroupSuccessMessage :underGroup.underGroup,
         })

       }

       
      }
      componentWillMount(){
        $.ajax({
          method : "GET",
          url : "api/master/accounts/group/all",
          beforeSend : this.setState({spinner : true}),
          success: (data)=>{
            let tempGroup = [];
            let oldTempGroup =[];
            data.data.forEach((element)=>{
              tempGroup.push(element.name);
              oldTempGroup.push({name : element.name, underGroup : element.underGroup});
            });

            
            data.parentGroup.forEach((element)=>{
              tempGroup.push(element);
            })
            this.setState({
              groupList : tempGroup,
              oldGroupList : oldTempGroup//created for oldgroup along with under group
            })

           
          },
          error : (err)=>{
            console.log(err.responseText);
          },
          complete : ()=>{
            this.setState({spinner : false});
          }
        })
        
        
      }

      onSubmit =(e)=>{
        e.preventDefault();
        try {
          if(this.state.groupList.indexOf(this.state.underGroup) < 0){
            this.setState({
              ajaxError : true,
              ajaxErrorMessage : "Invalid under Group",
              ajaxSuccess : false,
              ajaxSuccessMessage :""
            });
            return;
          }

          if(this.state.groupList.indexOf(this.state.oldName) < 0){
            this.setState({
              ajaxError : true,
              ajaxErrorMessage : "Invalid old name",
              ajaxSuccess : false,
              ajaxSuccessMessage :""
            });
            return;
          }
          $.ajax({
            method : "PUT",
            url : "/api/master/accounts/group",
            beforeSend : this.setState({spinner : true}),
            data : {oldName : this.state.oldName, name : this.state.name, underGroup : this.state.underGroup},
            success : (data)=>{
              this.setState({
                ajaxError : false,
                ajaxErrorMessage : "",
                ajaxSuccess : true,
                ajaxSuccessMessage : data.message
              });
            },
            error : (err)=>{
              this.setState({
                ajaxError : true,
                ajaxErrorMessage : err.responseText,
                ajaxSuccess : false,
                ajaxSuccessMessage :""
              });
            },
            complete : ()=>{
              this.setState({spinner : false})
            }
          })
          
        } catch (error) {
          
        }
      }

  render() {
    return (
      <div>
          <Container>
              <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <h3>Alter Group</h3>
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

                        <datalist name="oldGroupList" id="oldGroupList">
                          {
                            this.state.oldGroupList.map((group, index)=>{
                              return(
                                  <option key={`oldGroupList${index}`} value={group.name}/>
                              )
                            })
                          }
                        </datalist>
                        <FormGroup>
                            <Label for="oldName">Old Name</Label>
                            <Input type="text" name="oldName" id="oldName" list="oldGroupList" autoComplete="off" placeholder="Enter group name" value={this.state.oldName} onChange={this.onChange} onBlur={this.onBlur}/>
                        </FormGroup>

                        <Alerts 
                            alertSuccess = {this.state.ajaxGetUnderGroupSuccess}
                            alertError = {this.state.ajaxGetUnderGroupError}
                            alertSuccessMessage = {this.state.ajaxGetUnderGroupSuccessMessage}
                            alertErrorMessage = {this.state.ajaxGetUnderGroupErrorMessage}
                        />
                        <FormGroup>
                            <Label for="name">New Name</Label>
                            <Input type="text" name="name" id="name" autoComplete="off" value={this.state.name} placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="underGroup">Under Group</Label>
                            <Input type="text" name="underGroup" id="underGroup" value={this.state.underGroup} autoComplete="off" list="groupList" placeholder="Enter group name" onChange={this.onChange}/>
                        </FormGroup>
                        <FormGroup>
                          <Row>
                            <Col>
                            <Button color="info">Alter Group</Button>
                            </Col>
                            <Col>
                              {this.state.spinner ? <Spinner color="info"/> : ""}
                            </Col>
                          </Row>
                          </FormGroup>

                    </Form>
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
