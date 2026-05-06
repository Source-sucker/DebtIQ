const express = require('express');
const cors = require('cors');
const loansRouter = require('./routes/loans');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/loans', loansRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DebtIQ Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to DebtIQ Backend API',
    endpoints: {
      health: 'GET /api/health',
      loans: {
        list: 'GET /api/loans',
        stats: 'GET /api/loans/stats',
        get: 'GET /api/loans/:id',
        create: 'POST /api/loans',
        update: 'PUT /api/loans/:id',
        delete: 'DELETE /api/loans/:id'
      }
    }
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DebtIQ Backend API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📋 API docs: http://localhost:${PORT}/`);
});

module.exports = app;