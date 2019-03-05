import './App.css';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurNavbar from "./components/nav/navbar";
import CurRoutes from "./components/commons/CurRoutes"
import SideBar from "./components/sidebar/SideBar"
import {Container, Row, Col} from "reactstrap"







class App extends Component {
  render() {
    return (
     
      <div className="App">
      <Container>
        <CurNavbar />
        <Row>
          <Col xs="12" sm="3" lg="2"><SideBar /></Col>
        <Col><CurRoutes /></Col>
        

        </Row>


      </Container>
        

      </div>

    );
  }
}

export default App;
