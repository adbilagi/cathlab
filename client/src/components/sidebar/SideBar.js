import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


export default class Example extends React.Component {
  render() {
    return (
      <div>
        <p>Links</p>
        <Nav vertical>
          <NavItem>
            <NavLink href="/links/vouchers">Vouchers</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/links/users">Users</NavLink>
          </NavItem>

        </Nav>
      </div>
    );
  }
}