const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../db.sqlite'),
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('SQLite connection established'))
  .catch(err => console.error('SQLite connection error:', err));

module.exports = sequelize;