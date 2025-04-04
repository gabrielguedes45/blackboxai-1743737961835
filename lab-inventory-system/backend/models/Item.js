const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('equipment', 'tool', 'material'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available', 'on-loan', 'maintenance'),
      defaultValue: 'available'
    },
    restrictions: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('restrictions');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('restrictions', JSON.stringify(value || []));
      }
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'items',
    timestamps: true
  });
};
