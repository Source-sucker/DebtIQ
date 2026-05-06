const express = require('express');
const loanModel = require('../models/loanModel');

const router = express.Router();

/**
 * GET /api/loans
 * Get all loans with optional sorting
 */
router.get('/', async (req, res) => {
  try {
    const { sortBy } = req.query;
    const loans = await loanModel.getAllLoans({ sortBy });
    res.json({
      success: true,
      data: loans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/loans/stats
 * Get loan statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await loanModel.getLoanStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/loans/:id
 * Get a specific loan by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await loanModel.getLoanById(id);

    if (!loan) {
      return res.status(404).json({
        success: false,
        error: 'Loan not found'
      });
    }

    res.json({
      success: true,
      data: loan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/loans
 * Create a new loan
 */
router.post('/', async (req, res) => {
  try {
    const loanData = req.body;
    const loan = await loanModel.createLoan(loanData);

    res.status(201).json({
      success: true,
      data: loan,
      message: 'Loan created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/loans/:id
 * Update an existing loan
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const loan = await loanModel.updateLoan(id, updateData);

    if (!loan) {
      return res.status(404).json({
        success: false,
        error: 'Loan not found'
      });
    }

    res.json({
      success: true,
      data: loan,
      message: 'Loan updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/loans/:id
 * Delete a loan
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await loanModel.deleteLoan(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Loan not found'
      });
    }

    res.json({
      success: true,
      message: 'Loan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;