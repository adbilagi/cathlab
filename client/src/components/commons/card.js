import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const ExampleCard = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={props.imgSrc} alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.subTitle}</CardSubtitle>
          <CardText>{props.text}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ExampleCard;