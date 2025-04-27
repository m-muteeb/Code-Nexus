// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../service/firebase'; // Firebase auth import

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
    <Navbar fixed="top" expand="lg" variant="dark" style={{
      backgroundColor: '#343a40', 
      padding: '10px 0'
    }}>
      <Container>
        {/* Logo Section */}
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '1.8rem', fontWeight: '600', color: '#ffffff' }}>
          {/* Circular logo */}
          <img 
            src="https://img.freepik.com/free-photo/hand-holding-megaphone-marketing-announcement-campaign_53876-129551.jpg?uid=R161881195&ga=GA1.1.131388642.1745678187&semt=ais_hybrid&w=740"  // Replace with your external logo URL
            alt="Logo" 
            style={{
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              marginRight: '10px' // Adjust margin as needed
            }} 
          />
          AI Fake Logo Checker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-center" />
        <Navbar.Collapse id="navbar-center" className="justify-content-between">
          <Nav className="mx-auto text-center">
            <Nav.Link as={Link} to="/" style={{
              color: '#ffffff', 
              fontSize: '1rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              padding: '8px 20px', 
              transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out'
            }} 
            onMouseOver={(e) => e.target.style.color = '#007bff'} 
            onMouseOut={(e) => e.target.style.color = '#ffffff'}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{
              color: '#ffffff', 
              fontSize: '1rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              padding: '8px 20px', 
              transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out'
            }} 
            onMouseOver={(e) => e.target.style.color = '#007bff'} 
            onMouseOut={(e) => e.target.style.color = '#ffffff'}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/features" style={{
              color: '#ffffff', 
              fontSize: '1rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              padding: '8px 20px', 
              transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out'
            }} 
            onMouseOver={(e) => e.target.style.color = '#007bff'} 
            onMouseOut={(e) => e.target.style.color = '#ffffff'}>
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{
              color: '#ffffff', 
              fontSize: '1rem', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              padding: '8px 20px', 
              transition: 'color 0.3s ease-in-out, transform 0.3s ease-in-out'
            }} 
            onMouseOver={(e) => e.target.style.color = '#007bff'} 
            onMouseOut={(e) => e.target.style.color = '#ffffff'}>
              Contact
            </Nav.Link>
          </Nav>

          {/* Conditional rendering for buttons */}
          <div className="d-flex mt-3 mt-lg-0">
            {user ? (
              // Show Logout button if user is logged in
              <Button 
                variant="outline-light" 
                onClick={handleLogout} 
                style={{
                  fontSize: '1rem', 
                  padding: '8px 20px', 
                  borderRadius: '30px', 
                  marginLeft: '10px', 
                  transition: 'background-color 0.3s ease, transform 0.3s ease', 
                  backgroundColor: 'transparent', 
                  color: '#ffffff', 
                  borderColor: '#ffffff'
                }} 
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} 
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onMouseDown={(e) => e.target.style.backgroundColor = '#003366'}
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
                  style={{
                    fontSize: '1rem', 
                    padding: '8px 20px', 
                    borderRadius: '30px', 
                    marginLeft: '10px', 
                    transition: 'background-color 0.3s ease, transform 0.3s ease', 
                    backgroundColor: 'transparent', 
                    color: '#ffffff', 
                    borderColor: '#ffffff'
                  }} 
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} 
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  onMouseDown={(e) => e.target.style.backgroundColor = '#003366'}
                >
                  Login
                </Button>
                <Button 
                  variant="light" 
                  as={Link} 
                  to="/signup" 
                  style={{
                    fontSize: '1rem', 
                    padding: '8px 20px', 
                    borderRadius: '30px', 
                    marginLeft: '10px', 
                    transition: 'background-color 0.3s ease, transform 0.3s ease', 
                    backgroundColor: '#f8f9fa', 
                    color: '#007bff', 
                    borderColor: '#007bff'
                  }} 
                  onMouseOver={(e) => e.target.style.backgroundColor = '#007bff'} 
                  onMouseOut={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseDown={(e) => e.target.style.backgroundColor = '#0056b3'}
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
