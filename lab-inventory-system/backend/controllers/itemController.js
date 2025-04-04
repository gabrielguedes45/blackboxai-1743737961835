const { Item } = require('../models');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedItem = await Item.findByPk(req.params.id);
      res.json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchItems = async (req, res) => {
  try {
    const { q } = req.query;
    const items = await Item.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`
        }
      }
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  searchItems
};