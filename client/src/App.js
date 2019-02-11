import React, { Component } from 'react';
import CurNavbar from "./components/nav/navbar";
import CurLogin from "./components/users/login"
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurNavbar />
        <CurLogin />
      </div>
    );
  }
}

export default App;
