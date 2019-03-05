import React, { Component } from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home"
import CurLogin from "../users/Login"
import Logout from "../users/Logout"
import SignUp from "../users/SignUp"
import ChangeRole from "../users/ChangeRole"
import ChanngePassword from "../users/ChangePassword"
import SetActivityUser from "../users/SetActivityUser"
import UsersLinks from '../sidebar/UsersLinks';
import VoucherLinks from "../sidebar/VoucherLinks"


export default class CurRoutes extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {/* side bar links */}
            <Route exact path ="/links/vouchers" component={VoucherLinks}/>
            <Route exact path="/links/users" component ={UsersLinks}/>

            
              {/* Users peronal */}
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={CurLogin}/>
            <Route exact path="/logout" component={Logout}/>
            
            <Route exact path="/changepassword" component={ChanngePassword}/>

            {/* User admin routes */}
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/changerole" component={ChangeRole}/>
            <Route exact path="/setactivityuser" component={SetActivityUser}/>
          </div>

        </BrowserRouter>
      </div>
    )
  }
}
