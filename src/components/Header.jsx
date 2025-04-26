// src/components/Header.jsx
import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => (
  <Navbar fixed="top" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#">AI Fake Ad Checker</Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
