import React, { Component } from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home"
import CurLogin from "../users/Login"
import Logout from "../users/Logout"
import SignUp from "../users/SignUp"


export default class CurRoutes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user/login" component={CurLogin}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/user/signup" component={SignUp}/>
          </div>

        </BrowserRouter>
      </div>
    )
  }
}
