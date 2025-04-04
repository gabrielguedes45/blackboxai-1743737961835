const express = require('express');
const router = express.Router();
const { protect, role } = require('../middleware/auth');
const {
  getAllItems,
  createItem,
  updateItem,
  searchItems
} = require('../controllers/itemController');

// Public routes
router.get('/', getAllItems);
router.get('/search', searchItems);

// Admin/Secretary routes
router.post('/', protect, role('admin', 'secretary'), createItem);
router.put('/:id', protect, role('admin', 'secretary'), updateItem);

module.exports = router;