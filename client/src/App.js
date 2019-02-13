import React, { Component } from 'react';
import Home from "./components/Home"
import CurNavbar from "./components/nav/navbar";
import CurLogin from "./components/users/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurNavbar />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={CurLogin}/>
          </div>

        </BrowserRouter>
    
      </div>
    );
  }
}

export default App;
