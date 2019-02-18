import React, { Component } from 'react'
import Home from "../commons/Home"
import $ from "jquery";
export default class Logout extends Component {
    componentDidMount(){
        $.ajax({
            method : "GET",
            url : "/api/users/logout",
            success : (res)=>{
              console.log(res);
            },
            error : (err)=>{
              console.log(err);
            }
        })
    }
  render() {
    return (
      <div>
          <Home />
      </div>
    )
  }
}
