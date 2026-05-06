const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { calculateEMI, validateLoanData } = require('../utils/emiCalculator');

const LOANS_FILE = path.join(__dirname, '../data/loans.json');

/**
 * Loan Model - Handles CRUD operations for loans
 */
class LoanModel {
  /**
   * Load all loans from storage
   * @returns {Array} Array of loan objects
   */
  async loadLoans() {
    try {
      const data = await fs.readFile(LOANS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is corrupted, return empty array
      console.warn('Error loading loans:', error.message);
      return [];
    }
  }

  /**
   * Save loans to storage
   * @param {Array} loans - Array of loan objects
   */
  async saveLoans(loans) {
    try {
      await fs.writeFile(LOANS_FILE, JSON.stringify(loans, null, 2));
    } catch (error) {
      throw new Error(`Failed to save loans: ${error.message}`);
    }
  }

  /**
   * Get all loans
   * @param {object} options - Query options (sort, filter)
   * @returns {Array} Array of loans
   */
  async getAllLoans(options = {}) {
    let loans = await this.loadLoans();

    // Apply sorting
    if (options.sortBy) {
      loans = this.sortLoans(loans, options.sortBy);
    }

    return loans;
  }

  /**
   * Get loan by ID
   * @param {string} id - Loan ID
   * @returns {object|null} Loan object or null
   */
  async getLoanById(id) {
    const loans = await this.loadLoans();
    return loans.find(loan => loan.id === id) || null;
  }

  /**
   * Create a new loan
   * @param {object} loanData - Loan data
   * @returns {object} Created loan
   */
  async createLoan(loanData) {
    // Validate input
    validateLoanData(loanData);

    const loans = await this.loadLoans();

    // Calculate EMI
    const emiDetails = calculateEMI(loanData.principal, loanData.annualRate, loanData.months);

    // Create loan object
    const loan = {
      id: uuidv4(),
      name: loanData.name.trim(),
      principal: loanData.principal,
      annualRate: loanData.annualRate,
      months: loanData.months,
      startDate: loanData.startDate,
      lender: loanData.lender.trim(),
      monthlyEMI: emiDetails.monthlyEMI,
      totalAmount: emiDetails.totalAmount,
      totalInterest: emiDetails.totalInterest,
      status: 'active', // active, paid_off
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    loans.push(loan);
    await this.saveLoans(loans);

    return loan;
  }

  /**
   * Update an existing loan
   * @param {string} id - Loan ID
   * @param {object} updateData - Updated loan data
   * @returns {object|null} Updated loan or null if not found
   */
  async updateLoan(id, updateData) {
    const loans = await this.loadLoans();
    const loanIndex = loans.findIndex(loan => loan.id === id);

    if (loanIndex === -1) {
      return null;
    }

    const existingLoan = loans[loanIndex];

    // Prepare updated data
    const updatedData = {
      ...existingLoan,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    // Validate updated data
    validateLoanData(updatedData);

    // Recalculate EMI if principal, rate, or months changed
    if (updateData.principal !== undefined || updateData.annualRate !== undefined || updateData.months !== undefined) {
      const emiDetails = calculateEMI(updatedData.principal, updatedData.annualRate, updatedData.months);
      updatedData.monthlyEMI = emiDetails.monthlyEMI;
      updatedData.totalAmount = emiDetails.totalAmount;
      updatedData.totalInterest = emiDetails.totalInterest;
    }

    loans[loanIndex] = updatedData;
    await this.saveLoans(loans);

    return updatedData;
  }

  /**
   * Delete a loan
   * @param {string} id - Loan ID
   * @returns {boolean} True if deleted, false if not found
   */
  async deleteLoan(id) {
    const loans = await this.loadLoans();
    const filteredLoans = loans.filter(loan => loan.id !== id);

    if (filteredLoans.length === loans.length) {
      return false; // Loan not found
    }

    await this.saveLoans(filteredLoans);
    return true;
  }

  /**
   * Sort loans by criteria
   * @param {Array} loans - Array of loans
   * @param {string} sortBy - Sort criteria
   * @returns {Array} Sorted loans
   */
  sortLoans(loans, sortBy) {
    const sortedLoans = [...loans];

    switch (sortBy) {
      case 'dueDate':
        return sortedLoans.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      case 'interest':
        return sortedLoans.sort((a, b) => b.annualRate - a.annualRate);
      case 'amount':
        return sortedLoans.sort((a, b) => b.principal - a.principal);
      case 'name':
        return sortedLoans.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedLoans;
    }
  }

  /**
   * Get loan statistics
   * @returns {object} Statistics object
   */
  async getLoanStats() {
    const loans = await this.loadLoans();

    const stats = {
      totalLoans: loans.length,
      activeLoans: loans.filter(l => l.status === 'active').length,
      totalPrincipal: loans.reduce((sum, l) => sum + l.principal, 0),
      totalMonthlyEMI: loans.filter(l => l.status === 'active').reduce((sum, l) => sum + l.monthlyEMI, 0),
      totalInterest: loans.reduce((sum, l) => sum + l.totalInterest, 0)
    };

    // Round monetary values
    stats.totalPrincipal = Math.round(stats.totalPrincipal * 100) / 100;
    stats.totalMonthlyEMI = Math.round(stats.totalMonthlyEMI * 100) / 100;
    stats.totalInterest = Math.round(stats.totalInterest * 100) / 100;

    return stats;
  }
}

module.exports = new LoanModel();