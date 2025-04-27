import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { auth } from '../service/firebase'; // Firebase auth import
import '../styles/header.css'; // Import external CSS

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for changes in the auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <Navbar fixed="top" expand="lg" variant="dark" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">AI Fake Ad Checker</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-center" />
        <Navbar.Collapse id="navbar-center" className="justify-content-between">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Conditional rendering for buttons */}
          <div className="d-flex mt-3 mt-lg-0">
            {user ? (
              // Show Logout button if user is logged in
              <Button 
                variant="outline-light" 
                onClick={handleLogout} 
                className="custom-button"
              >
                Logout
              </Button>
            ) : (
              <>
                {/* Show Login/Sign Up buttons if user is not logged in */}
                <Button 
                  variant="outline-light" 
                  as={Link} 
                  to="/login" 
                  className="me-2 custom-button"
                >
                  Login
                </Button>
                <Button 
                  variant="light" 
                  as={Link} 
                  to="/signup" 
                  className="custom-button"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
