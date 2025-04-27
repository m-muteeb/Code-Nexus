import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/aboutpage.css'; // Link external CSS

const About = () => {
  return (
    <section className="about-section" id="about">
      <Container>
        <h2 className="section-heading">About Us</h2>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <p className="about-paragraph">
              <strong className='text-dark'>Code Nexus</strong> is a team of passionate developers, designers, and AI enthusiasts committed to building innovative solutions that make a real-world impact. 
              We believe in the power of collaboration, creativity, and cutting-edge technology to solve complex problems and bring ideas to life.
            </p>

            <p className="about-paragraph">
              Our latest project, <strong className='text-dark'>AI Fake Ad Checker</strong>, is designed to detect fraudulent ads using advanced image recognition, text analysis, and trust scoring mechanisms. 
              Our goal is to create a safer digital environment where users can verify authenticity before engaging with online ads — helping individuals and businesses stay protected from scams.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
