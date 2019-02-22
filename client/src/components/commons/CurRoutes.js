import React, { Component } from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home"
import CurLogin from "../users/Login"
import Logout from "../users/Logout"
import SignUp from "../users/SignUp"
import ChangeRole from "../users/ChangeRole"
import ChanngePassword from "../users/ChangePassword"


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
            <Route exact path="/user/changerole" component={ChangeRole}/>
            <Route exact path="/user/changepassword" component={ChanngePassword}/>
          </div>

        </BrowserRouter>
      </div>
    )
  }
}
