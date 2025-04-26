// src/pages/HomePage.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import URLInput from '../components/URLInput';
import ResultDisplay from '../components/ResultDisplay';
import HistoryList from '../components/HistoryList';
import { checkAdAuthenticity } from '../service/aiService';
import { saveHistory } from '../service/firebase';

const HomePage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckAd = async (url) => {
    setLoading(true);
    const authenticity = await checkAdAuthenticity(url);
    setResult(authenticity);
    await saveHistory(url, authenticity);
    setLoading(false);
  };

  return (
    <Container className="mt-5 pt-5">
      <Row>
        <Col md={6} className="mx-auto">
          <URLInput onSubmit={handleCheckAd} />
          <ResultDisplay result={result} loading={loading} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h5>Recent Checks</h5>
          <HistoryList />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
