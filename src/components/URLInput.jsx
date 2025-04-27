// src/components/ImageInput.jsx
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';

const ImageInput = ({ model, onPrediction }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !model) return;

    setLoading(true);

    try {
      // Create image element
      const img = new Image();
      img.src = URL.createObjectURL(image);

      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Draw image to canvas
      const canvas = document.createElement('canvas');
      canvas.width = 224;
      canvas.height = 224;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Classify using MobileNet
      const predictions = await model.classify(canvas);
      console.log('Predictions:', predictions);

      // Check for fake-related keywords
      const fakeKeywords = ['counterfeit', 'fake', 'replica', 'imitation'];
      const isFake = predictions.some(pred =>
        fakeKeywords.some(keyword =>
          pred.className.toLowerCase().includes(keyword)
        ) || pred.probability > 0.7
      );

      const result = isFake ? 'Fake' : 'Real';

      // Callback to parent with result and image
      onPrediction({
        result,
        predictions,
        previewURL: preview,
        imageFile: image,
      });
    } catch (err) {
      console.error('Prediction error:', err);
      onPrediction({ error: 'Prediction failed. Try another image.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="imageInput">
        <Form.Label>Upload Product Image</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Form.Group>

      {preview && (
        <div className="mt-3 text-center">
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '200px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
          />
        </div>
      )}

      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        disabled={!image || loading}
        style={{ width: '100%' }}
      >
        {loading ? 'Analyzing...' : 'Check Authenticity'}
      </Button>
    </Form>
  );
};

export default ImageInput;