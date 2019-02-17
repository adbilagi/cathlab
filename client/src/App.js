import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurNavbar from "./components/nav/navbar";
import CurRoutes from "./components/commons/CurRoutes"


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurNavbar />
        <CurRoutes />

      </div>
    );
  }
}

export default App;
