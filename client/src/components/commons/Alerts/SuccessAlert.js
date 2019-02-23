import React from 'react';
import {Alert} from "reactstrap";

export default function SuccessAlert(props) {
  return (
    <div>
      <Alert color="success">{props.message}</Alert>
    </div>
  )
}

