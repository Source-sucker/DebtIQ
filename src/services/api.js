import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Loan API calls
export const loanAPI = {
  // Get all loans
  getAllLoans: async (sortBy = null) => {
    try {
      const params = sortBy ? { sortBy } : {};
      const response = await api.get('/loans', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching loans:', error);
      throw error;
    }
  },

  // Get specific loan
  getLoanById: async (id) => {
    try {
      const response = await api.get(`/loans/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching loan:', error);
      throw error;
    }
  },

  // Get loan statistics
  getLoanStats: async () => {
    try {
      const response = await api.get('/loans/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Create new loan
  createLoan: async (loanData) => {
    try {
      const response = await api.post('/loans', loanData);
      return response.data;
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error;
    }
  },

  // Update loan
  updateLoan: async (id, loanData) => {
    try {
      const response = await api.put(`/loans/${id}`, loanData);
      return response.data;
    } catch (error) {
      console.error('Error updating loan:', error);
      throw error;
    }
  },

  // Delete loan
  deleteLoan: async (id) => {
    try {
      const response = await api.delete(`/loans/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting loan:', error);
      throw error;
    }
  },

  // Health check
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
};

export default api;