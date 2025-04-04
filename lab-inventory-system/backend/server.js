require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Initialize models
const User = require('./models/User')(sequelize);
const Item = require('./models/Item')(sequelize);
const Loan = require('./models/Loan')(sequelize);

// Set up associations
require('./models/associations')(sequelize);
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');
const loanRoutes = require('./routes/loans');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/loans', loanRoutes);

// Database connection
sequelize.sync()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Database connection error:', err));