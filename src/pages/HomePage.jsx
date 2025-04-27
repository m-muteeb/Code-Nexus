// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import URLInput from '../components/URLInput';
import ResultDisplay from '../components/ResultDisplay';
import HistoryList from '../components/HistoryList';
import { checkAdAuthenticity } from '../service/aiService';
import { saveHistory } from '../service/firebase';
import Features from '../components/feature';
import HeroSection from '../components/hero';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/homepage.css'; // External CSS

const HomePage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock login status (you should replace this with real auth check)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleCheckAd = async (url) => {
    setLoading(true);
    const authenticity = await checkAdAuthenticity(url);
    setResult(authenticity);
    await saveHistory(url, authenticity);
    setLoading(false);
  };

  const handleCheckAuthenticity = () => {
    if (!isLoggedIn) {
      toast.error('Please register yourself first!');
      return;
    }
    // Here, implement your image and details check functionality
    toast.success('Authenticity checked successfully!');
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <Container className="mt-5 pt-5">
      <HeroSection />
      {/* <Row>
        <Col md={6} className="mx-auto">
          <URLInput onSubmit={handleCheckAd} />
          <ResultDisplay result={result} loading={loading} />
        </Col>
      </Row> */}

      {/* NEW Stunning Section */}
      <section className="authenticity-section mt-5">
        <h2 className="section-title">Check Authenticity of Ads and Images</h2>
        <Form className="authenticity-form">
          <Form.Group controlId="formUserDetails">
            <Form.Label>Enter Your Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter details here"
              value={userDetails}
              onChange={(e) => setUserDetails(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>

          <Button
            className="mt-4 check-button"
            variant="primary"
            onClick={handleCheckAuthenticity}
          >
            Check Authenticity
          </Button>
        </Form>
      </section>

      <Row className="mt-5">
        <Col>
          {/* <h5>Recent Checks</h5> */}
          {/* <HistoryList /> */}
          <Features />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
