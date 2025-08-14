import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function Dashboard() {
  // Jai
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/protected')
      .then(res => setMessage(res.data.message))
      .catch(() => setMessage('Unauthorized'));
  }, []);

  return <h1>{message}</h1>;
}
