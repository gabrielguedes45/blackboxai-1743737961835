module.exports = (sequelize) => {
  const { User, Item, Loan } = sequelize.models;

  // User-Loan relationship (One-to-Many)
  User.hasMany(Loan, { foreignKey: 'userId' });
  Loan.belongsTo(User, { foreignKey: 'userId' });

  // Item-Loan relationship (Many-to-Many through LoanItems)
  Item.belongsToMany(Loan, {
    through: 'LoanItems',
    foreignKey: 'itemId',
    otherKey: 'loanId'
  });
  Loan.belongsToMany(Item, {
    through: 'LoanItems',
    foreignKey: 'loanId',
    otherKey: 'itemId'
  });
};