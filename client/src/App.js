import React, { Component } from 'react';
import CurNavbar from "./nav/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurNavbar />
      </div>
    );
  }
}

export default App;
