import React, { Component } from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home"
import CurLogin from "../users/login"

export default class CurRoutes extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={CurLogin}/>
          </div>

        </BrowserRouter>
      </div>
    )
  }
}
