// src/components/ResultDisplay.jsx
import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

const ResultDisplay = ({ result, loading }) => {
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <Alert variant={result === 'Real' ? 'success' : 'danger'}>
      <Alert.Heading>{result === 'Real' ? 'Authentic Ad' : 'Fake Ad Detected'}</Alert.Heading>
      <p>{result === 'Real' ? 'This ad is legitimate.' : 'This ad is likely fake.'}</p>
    </Alert>
  );
};

export default ResultDisplay;
