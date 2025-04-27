// src/components/HistoryList.jsx
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../service/firebase';

const HistoryList = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const querySnapshot = await getDocs(collection(db, 'history'));
      setHistory(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchHistory();
  }, []);

  return (
    <div 
      style={{
        backgroundColor: '#121212',  // Dark background for the whole container
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',  // Adds a subtle shadow for modern look
        marginBottom: '20px',
      }}
    >
      <h5 
        style={{
          color: '#ffffff',  // White text for the heading
          marginBottom: '20px',
          fontWeight: '600',
          textAlign: 'center',
        }}
      >
        Recent Checks
      </h5>

      <ListGroup 
        style={{
          backgroundColor: '#1a1a1a',  // Slightly lighter background for the list
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {history.map((item, index) => (
          <ListGroup.Item 
            key={index}
            style={{
              backgroundColor: '#1a1a1a',  // Dark background for each list item
              color: '#ffffff',  // White text for better readability
              border: 'none',  // No borders for cleaner look
              padding: '15px',
              fontSize: '16px',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a1a'}
          >
            <strong>{item.url}</strong> - {item.result} ({new Date(item.timestamp.seconds * 1000).toLocaleString()})
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default HistoryList;
