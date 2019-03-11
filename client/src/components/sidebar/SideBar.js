import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {



  
  render() {
    return (
      <div>
        <Nav vertical>
          <NavItem>
            <NavLink href="/links/vouchers">Vouchers</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/links/users">Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/links/accountinfo">Account Info</NavLink>
          </NavItem>

        </Nav>
      </div>
    );
  }
}