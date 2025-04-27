import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import '../styles/hero.css'; // Link to external CSS
import image1 from "../assets/image recog.jpg"
import image2 from "../assets/link.jpg"
import image4 from "../assets/fake.avif"

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          {/* Left Side Text */}
          <Col md={6} className="text-content">
            <h1>Detect Fake Ads Instantly</h1>
            <p className='text-dark'>
            Our AI-powered Fake Ad Checker goes beyond simple analysis by evaluating images, links, and texts to detect scam ads in real-time. Leveraging the latest in artificial intelligence, this tool ensures you are always one step ahead of deceptive advertisements. By analyzing every element of an ad — from the visuals to the underlying links and accompanying text — we can effectively identify fraudulent content before you even have a chance to click. 
            </p>
          </Col>

          {/* Right Side Carousel */}
          <Col md={6} className="carousel-content mt-4">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-image"
                  src={image2}
                  alt="Detect Fake Ad"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-image"
                  src={image1}
                  alt="Verify Ad Authenticity"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-image"
                  src={image4}
                  alt="Trust Score for Ads"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
