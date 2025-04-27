// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/footer.css'; // Link the external CSS

const Footer = () => (
  <footer className="text-white text-center py-3">
    <Container>
      <Row>
        <Col>
          <p>&copy; 2025 AI Fake Logo Checker. All rights reserved.</p>
          <p>
            Developed by <a href="https://code-nexus-pk.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-white">Code Nexus</a>
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
