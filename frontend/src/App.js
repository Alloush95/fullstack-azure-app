import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    
    // Fetch health status
    fetch(`${apiUrl}/api/health`)
      .then(res => res.json())
      .then(data => setBackendStatus(`Backend is ${data.status}`))
      .catch(() => setBackendStatus('Backend not reachable'));

    // Fetch users data
    fetch(`${apiUrl}/api/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack Azure App</h1>
        <p>Frontend is running!</p>
        <p>{backendStatus}</p>
      </header>
      
      <main className="App-main">
        <h2>Users List</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : users.length > 0 ? (
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p className="user-role">{user.role}</p>
                <p className="user-email">{user.email}</p>
                <span className={`user-status ${user.status}`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>No users found</p>
        )}
      </main>
    </div>
  );
}

export default App;
