import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/header.css'; // Import external CSS

const Header = () => (
  <Navbar fixed="top" expand="lg" variant="dark" className="custom-navbar">
    <Container>
      <Navbar.Brand href="#">AI Fake Ad Checker</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-center" />
      <Navbar.Collapse id="navbar-center" className="justify-content-between">
        <Nav className="mx-auto text-center">
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
        <div className="d-flex mt-3 mt-lg-0">
          <Link to="/login">
            <Button variant="outline-light" className="me-2 custom-button">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="light" className="custom-button">
              Sign Up
            </Button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Header;
