import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const ExampleCard = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="imgSRC" alt="Card image cap" />
        <CardBody>
          <CardTitle>title</CardTitle>
          <CardSubtitle>subtitle</CardSubtitle>
          <CardText>text</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ExampleCard;