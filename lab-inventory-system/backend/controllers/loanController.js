const { Loan, Item, User } = require('../models');
const { sendLoanNotification } = require('../services/email');

const createLoan = async (req, res) => {
  try {
    const { items, startDate, endDate } = req.body;
    
    // Create the loan record
    const loan = await Loan.create({
      userId: req.user.id,
      startDate,
      endDate,
      status: 'pending',
      conditionBefore: req.body.conditionBefore || null
    });

    // Associate items with the loan
    await loan.addItems(items);

    // Notify admin
    const admin = await User.findOne({ where: { role: 'admin' } });
    if (admin) {
      await sendLoanNotification({
        to: admin.email,
        type: 'new-request',
        loanId: loan.id
      });
    }

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { status, rejectionReason } = req.body;

    const loan = await Loan.findByPk(loanId, {
      include: [User, Item]
    });

    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    loan.status = status;
    if (status === 'rejected') {
      loan.rejectionReason = rejectionReason;
    }
    await loan.save();

    // Notify user
    await sendLoanNotification({
      to: loan.User.email,
      type: status === 'approved' ? 'approval' : 'rejection',
      loanId: loan.id,
      reason: rejectionReason
    });

    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createLoan, approveLoan };