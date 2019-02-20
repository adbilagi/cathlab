import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

const ExampleCard = (props) => {
  return (
        <Card body style={{marginBottom: "0.5em"}}>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.text}</CardText>
          <Button>Go somewhere</Button>
        </Card>
  );
};

export default ExampleCard;