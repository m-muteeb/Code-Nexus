import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/feature.css'; // External CSS for styling and animations
import image1 from "../assets/image recog.jpg"
import image2 from "../assets/link.jpg"
import image3 from "../assets/result.avif"
import image4 from "../assets/fake.avif"

const Features = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="features" className="features-section">
      <Container>
        <h2 className="section-title">Key Features</h2>
        <Row className="g-4 justify-content-center mb-4">
          <Col md={6} lg={3}>
            <Card className="feature-card animate-bottom">
              <Card.Img variant="top" src={image1} className="feature-icon" />
              <Card.Body>
                <Card.Title>Image Recognition</Card.Title>
                <Card.Text>
                  Our AI scans images to detect signs of fake advertisements using advanced machine learning algorithms.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="feature-card animate-left">
              <Card.Img variant="top" src={image2} className="feature-icon" />
              <Card.Body>
                <Card.Title>Link & Text Analysis</Card.Title>
                <Card.Text>
                  Analyze links and embedded texts in ads to identify malicious content and detect phishing attempts.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="feature-card animate-right">
              <Card.Img variant="top" src={image3} className="feature-icon" />
              <Card.Body>
                <Card.Title>Trust Scores</Card.Title>
                <Card.Text>
                  Instantly generate a trust score for any ad based on image, text, and link credibility factors.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3}>
            <Card className="feature-card animate-bottom">
              <Card.Img variant="top" src={image4} className="feature-icon" />
              <Card.Body>
                <Card.Title>Authenticity Check</Card.Title>
                <Card.Text>
                  Distinguish between original and fake advertisements with our powerful authenticity verification engine.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
