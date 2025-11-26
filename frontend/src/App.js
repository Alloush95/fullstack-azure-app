import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/api/health`)
      .then(res => res.json())
      .then(data => setBackendStatus(`Backend is ${data.status}`))
      .catch(() => setBackendStatus('Backend not reachable'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack Azure App</h1>
        <p>Frontend is running!</p>
        <p>{backendStatus}</p>
      </header>
    </div>
  );
}

export default App;
