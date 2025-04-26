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
    <ListGroup>
      {history.map((item, index) => (
        <ListGroup.Item key={index}>
          <strong>{item.url}</strong> - {item.result} ({new Date(item.timestamp.seconds * 1000).toLocaleString()})
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default HistoryList;
