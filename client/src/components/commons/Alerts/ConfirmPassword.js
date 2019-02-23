import React from 'react';
import {Alert} from "reactstrap";

export default function ConfirmPassword(props) {
  return (
    <div>
      <Alert color="danger">{props.message}</Alert>
    </div>
  )
}