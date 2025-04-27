// src/components/ResultDisplay.jsx
import React from 'react';
import { Spinner, Card } from 'react-bootstrap';

const ResultDisplay = ({ result, loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Spinner animation="border" variant="primary" />
        <div style={{ marginTop: '0.5rem', fontSize: '1rem', color: '#555' }}>
          Analyzing image...
        </div>
      </div>
    );
  }

  if (!result) return null;

  const isReal = result === 'Real';

  const cardStyle = {
    textAlign: 'center',
    marginTop: '2rem',
    padding: '1.5rem',
    borderRadius: '10px',
    border: `2px solid ${isReal ? '#28a745' : '#dc3545'}`, // ✅ Fix: use backticks
    backgroundColor: isReal ? '#e6fff0' : '#ffe6e6',
    color: isReal ? '#155724' : '#721c24',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.5',
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title style={titleStyle}>
          {isReal ? '✅ Authentic Logo Detected' : '⚠️ Fake Ad Detected'}
        </Card.Title>
        <Card.Text style={textStyle}>
          {isReal
            ? '✅ This logo is original and appears to be from a genuine product.'
            : '⚠️ This ad appears suspicious and may be fake. Please verify further.'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ResultDisplay;
