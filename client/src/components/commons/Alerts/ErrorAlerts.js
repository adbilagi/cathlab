import React from 'react';
import {Alert} from "reactstrap";

export default function ErrorAlerts(props) {
  return (
    <div>
      <Alert color="danger">{props.message}</Alert>
    </div>
  )
}
