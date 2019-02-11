import React, { Component } from 'react';
import navbar from "./nav/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello

        <navbar />
      </div>
    );
  }
}

export default App;
