// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/footer.css'; // Link the external CSS

const Footer = () => (
  <footer className="text-white text-center py-3">
    <Container>
      <Row>
        <Col>
          <p>&copy; 2025 AI Fake Ad Checker. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
