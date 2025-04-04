const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendLoanNotification = async ({ to, type, loanId, reason }) => {
  try {
    let subject, text;
    
    switch (type) {
      case 'new-request':
        subject = 'New Loan Request';
        text = `You have a new loan request (ID: ${loanId})`;
        break;
      case 'approval':
        subject = 'Loan Approved';
        text = `Your loan request (ID: ${loanId}) has been approved`;
        break;
      case 'rejection':
        subject = 'Loan Rejected';
        text = `Your loan request (ID: ${loanId}) has been rejected. Reason: ${reason}`;
        break;
      default:
        return;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text
    });
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

module.exports = { sendLoanNotification };