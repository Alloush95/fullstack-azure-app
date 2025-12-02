const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Mock data
const mockData = [
  { id: 1, name: 'John Doe', role: 'Software Engineer', email: 'john.doe@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', role: 'Product Manager', email: 'jane.smith@example.com', status: 'active' },
  { id: 3, name: 'Mike Johnson', role: 'UX Designer', email: 'mike.johnson@example.com', status: 'active' },
  { id: 4, name: 'Sarah Williams', role: 'DevOps Engineer', email: 'sarah.williams@example.com', status: 'inactive' },
  { id: 5, name: 'Tom Brown', role: 'Data Scientist', email: 'tom.brown@example.com', status: 'active' }
];

app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/users', (req, res) => {
  res.json({ users: mockData, count: mockData.length });
});

app.get('/api/users/:id', (req, res) => {
  const user = mockData.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
