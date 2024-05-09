// Header.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = ({ handleFilterChange }) => {
  const handleNavItemClick = (filter) => {
    handleFilterChange(filter);
  };

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => handleNavItemClick('all')}>Accueil</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('short')}>Short</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('medium')}>Medium</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('long')}>Long</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
