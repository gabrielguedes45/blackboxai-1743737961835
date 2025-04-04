const sequelize = require('../config/database');

// Import model factories
const User = require('./User');
const Item = require('./Item');
const Loan = require('./Loan');

// Initialize models
const models = {
  User: User(sequelize),
  Item: Item(sequelize),
  Loan: Loan(sequelize)
};

// Set up associations
require('./associations')(sequelize);

module.exports = {
  ...models,
  sequelize
};

// Load associations
require('./associations')(sequelize);

// Add sequelize and Sequelize to exports
module.exports = {
  ...models,
  sequelize,
  Sequelize: require('sequelize')
};
