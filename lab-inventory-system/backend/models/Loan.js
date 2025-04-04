const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Loan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'returned'),
      defaultValue: 'pending'
    },
    conditionBefore: {
      type: DataTypes.TEXT
    },
    conditionAfter: {
      type: DataTypes.TEXT
    },
    rejectionReason: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'loans',
    timestamps: true
  });
};
