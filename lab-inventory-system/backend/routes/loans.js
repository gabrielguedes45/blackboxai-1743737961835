const express = require('express');
const router = express.Router();
const { protect, role } = require('../middleware/auth');
const { createLoan, approveLoan } = require('../controllers/loanController');
const { validateLoanRequest } = require('../middleware/validation');

// Client routes
router.post('/', 
  protect, 
  role('client'), 
  validateLoanRequest, 
  createLoan
);

// Admin/Secretary routes
router.put('/:loanId/approve', 
  protect, 
  role('admin', 'secretary'), 
  approveLoan
);

module.exports = router;