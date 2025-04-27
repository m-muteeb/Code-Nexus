import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { auth } from '../service/firebase'; // Import auth
import ResultDisplay from '../components/ResultDisplay';
import HistoryList from '../components/HistoryList';
import { saveHistory } from '../service/firebase';

const HomePage = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState('');
  const [user, setUser] = useState(null); // Track logged-in user
  const fileInputRef = useRef(null);

  const [model, setModel] = useState(null);

  // Load the model
  useEffect(() => {
    tf.ready().then(async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    });
  }, []);

  // Check auth status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCheckProduct = async () => {
    if (!fileInputRef.current.files[0] || !model || !user) return;

    setLoading(true);
    setError(null);

    try {
      const imageFile = fileInputRef.current.files[0];
      const imgElement = document.createElement('img');
      imgElement.src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(imageFile);
      });

      await new Promise((resolve) => {
        imgElement.onload = resolve;
      });

      const predictions = await model.classify(imgElement);
      console.log('Predictions:', predictions);

      const fakeKeywords = ['counterfeit', 'fake', 'replica', 'imitation'];
      const isFake = predictions.some(pred =>
        fakeKeywords.some(keyword =>
          pred.className.toLowerCase().includes(keyword)
        ) || pred.probability > 0.7
      );

      setResult(isFake ? 'Fake' : 'Real');
      await saveHistory(imageFile.name, isFake ? 'Fake' : 'Real');
    } catch (err) {
      console.error('Error:', err);
      setError('Analysis failed. Try another image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5 pt-3" style={{ maxWidth: '800px' }}>
      <Row>
        <Col>
          <h2 className="text-center mb-4 mt-3 page-heading">
            Fake Product Detector
          </h2>

          {/* Image Upload */}
          <div
            className="border rounded p-3 mb-3 upload-container"
          >
            {!user && (
              <Alert variant="warning" className="text-center">
                Please <Button variant="link" onClick={() => alert('Please login to upload and check products.')}>login</Button> to upload and check products.
              </Alert>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="d-none"
              id="imageUpload"
              disabled={!user}
            />

            <label
              htmlFor="imageUpload"
              className={`btn ${user ? 'btn-primary' : 'btn-secondary'} mb-3 upload-btn`}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'center',
                cursor: user ? 'pointer' : 'not-allowed',
              }}
            >
              {preview ? 'Change Image' : 'Upload Product Image'}
            </label>

            {preview && user && (
              <div className="text-center preview-container">
                <img
                  src={preview}
                  alt="Preview"
                  className="preview-image mb-3"
                />
                <Button
                  variant="primary"
                  onClick={handleCheckProduct}
                  disabled={loading}
                  className="full-width-btn"
                >
                  {loading ? 'Analyzing...' : 'Check Authenticity'}
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          {error && <Alert variant="danger">{error}</Alert>}
          <ResultDisplay result={result} loading={loading} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h5 className="border-bottom pb-2 recent-checks-heading">
            Recent Checks
          </h5>
          <HistoryList />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
