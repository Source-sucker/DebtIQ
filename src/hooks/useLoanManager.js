import { useState, useEffect, useCallback } from 'react';
import { loanAPI } from '../services/api';

export const useLoanManager = () => {
  const [loans, setLoans] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all loans
  const fetchLoans = useCallback(async (sortBy = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loanAPI.getAllLoans(sortBy);
      setLoans(response.data || []);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch loans');
      setLoans([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    setError(null);
    try {
      const response = await loanAPI.getLoanStats();
      setStats(response.data || null);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch stats');
      return null;
    }
  }, []);

  // Create loan
  const createLoan = useCallback(async (loanData) => {
    setError(null);
    try {
      const response = await loanAPI.createLoan(loanData);
      if (response.success) {
        // Refresh loans list
        await fetchLoans();
        await fetchStats();
        return response.data;
      }
    } catch (err) {
      setError(err.message || 'Failed to create loan');
      throw err;
    }
  }, [fetchLoans, fetchStats]);

  // Update loan
  const updateLoan = useCallback(async (id, loanData) => {
    setError(null);
    try {
      const response = await loanAPI.updateLoan(id, loanData);
      if (response.success) {
        await fetchLoans();
        await fetchStats();
        return response.data;
      }
    } catch (err) {
      setError(err.message || 'Failed to update loan');
      throw err;
    }
  }, [fetchLoans, fetchStats]);

  // Delete loan
  const deleteLoan = useCallback(async (id) => {
    setError(null);
    try {
      const response = await loanAPI.deleteLoan(id);
      if (response.success) {
        await fetchLoans();
        await fetchStats();
        return true;
      }
    } catch (err) {
      setError(err.message || 'Failed to delete loan');
      throw err;
    }
  }, [fetchLoans, fetchStats]);

  // Fetch data on mount
  useEffect(() => {
    fetchLoans();
    fetchStats();
  }, [fetchLoans, fetchStats]);

  return {
    loans,
    stats,
    loading,
    error,
    fetchLoans,
    fetchStats,
    createLoan,
    updateLoan,
    deleteLoan
  };
};

export default useLoanManager;