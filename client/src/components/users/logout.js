import React, { Component } from 'react'
import Home from "../commons/Home"
import $ from "jquery";
export default class Logout extends Component {
    componentDidMount(){
        $.ajax({
            method : "GET",
            url : "/logout"
        }).done((res)=>{
            console.log(res);
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
