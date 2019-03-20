import React, { Component } from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home"
import CurLogin from "../users/Login"
import Logout from "../users/Logout"
import SignUp from "../users/SignUp"
import ChangeRole from "../users/ChangeRole"
import ChanngePassword from "../users/ChangePassword"
import SetActivityUser from "../users/SetActivityUser"

// accountinfo imports groups
import CreateGroup from "../groups/CreateGroup"
import AlterGroup from "../groups/AlterGroup"
import DeleteGroup from "../groups/DeleteGroup";
// account info imports ledgers
import CreateLedger from "../ledgers/CreateLedger"
import AlterLedger from "../ledgers/AlterLedger"
import DeleteLedger from "../ledgers/DeleteLedgers"

import UsersLinks from '../sidebar/UsersLinks';
import VoucherLinks from "../sidebar/VoucherLinks"
import AccountInfo from "../sidebar/AccountInfo";


export default class CurRoutes extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            {/* side bar links */}
            <Route exact path ="/links/vouchers" component={VoucherLinks}/>
            <Route exact path="/links/users" component ={UsersLinks}/>
            <Route exact path="/links/accountinfo" component ={AccountInfo}/>

            
              {/* Users personal */}
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={CurLogin}/>
            <Route exact path="/logout" component={Logout}/>
            
            <Route exact path="/changepassword" component={ChanngePassword}/>

            {/* User admin routes */}
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/changerole" component={ChangeRole}/>
            <Route exact path="/setactivityuser" component={SetActivityUser}/>

            {/* /* Account info groups */}
            <Route exact path="/creategroup" component={CreateGroup}/>
            <Route exact path="/altergroup" component={AlterGroup}/>
            <Route exact path="/deletegroup" component={DeleteGroup}/>
            {/* /* Account info ledgers */}
            <Route exact path="/createledger" component={CreateLedger}/>
            <Route exact path="/alterledger" component={AlterLedger}/>
            {/* <Route exact path="/deleteledger" component={DeleteLedger}/> */}
          </div>

        </BrowserRouter>
      </div>
    )
  }
}
