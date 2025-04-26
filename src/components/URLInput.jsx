// src/components/URLInput.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const URLInput = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="urlInput">
        <Form.Label>Enter Ad URL</Form.Label>
        <Form.Control
          type="url"
          placeholder="Paste URL here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Check Authenticity
      </Button>
    </Form>
  );
};

export default URLInput;
