import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';


const ExampleCard = (props) => {
  return (
        <Card body style={{marginBottom: "0.5em"}}>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.text}</CardText>
          <Button href={props.path}>Click Here</Button>
        </Card>
  );
};

export default ExampleCard;