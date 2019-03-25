import React, { Component } from 'react'
import {Container, Row, Col, Media} from "reactstrap"


import welcome from "../../images/welcome.jpg"

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Media src={welcome} style={imgStyles}/>
        </Col>
        </Row>
      </Container>

    )
  }
}

let imgStyles = {
  maxHeight: 400,
  maxWidth: 400
}
